import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SourceTaskData, CaseData, CHARACTERS, STOLEN_ITEMS } from '../../../gameplay/models/task-content.data';
import { Player } from '../../models/player.data';
import { MatSelectChange } from '@angular/material';
import { ControlService } from '../../services/control.service';

const DYNAMIC_TASKS_CONTENT = require('../../../../assets/dynamic-tasks-content.json');

@Component({
  selector: 'app-modify-tasks',
  templateUrl: './modify-tasks.component.html'
})
export class ModifyTasksComponent implements OnInit {

  @Input() player: Player;
  @Output() hide = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<SourceTaskData>();

  taskData: SourceTaskData;
  caseForm: FormGroup;
  selectedCaseId: number;
  selectedCaseScene: string;

  minCluesNumber = 3;
  maxCluesNumber: number;
  maxWordGroups: number;
  maxClozeTest: number;

  showVersions = false;
  showVersion: {[key: number]: boolean} = {};
  showClues = false;
  showSingleChoice = false;

  characters = CHARACTERS;
  stolenItems = STOLEN_ITEMS;

  loading = false;
  isSent = false;
  err: string;

  constructor(
    private formBuilder: FormBuilder,
    private controlService: ControlService
  ) { }

  ngOnInit() {
    if (this.player && this.player.customTaskData) {
      this.taskData = JSON.parse(JSON.stringify(this.player.customTaskData));
    } else {
      this.taskData = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
    }
    this.maxCluesNumber = this.taskData.clues.jobs.length + this.taskData.clues.other.length - 1;
    this.maxWordGroups = this.taskData.exercises.wordGroups.length;
    this.maxClozeTest = this.taskData.exercises.clozeTest.length;
  }

  selectCase(change: MatSelectChange) {
    const id = change.value;
    const selected = this.taskData.cases.find(el => el.id === id);
    this.selectedCaseScene = selected.scene;
    if (selected) {
      this.initForm(selected);
    }
  }

  save() {
    if (this.caseForm.valid) {
      this.loading = true;
      const update = this.caseForm.getRawValue();
      this.taskData.cases = this.taskData.cases.map(el => {
        if (el.id === this.selectedCaseId) {
          el = {id: el.id, scene: el.scene, ...update};
        }
        return el;
      });
      this.controlService.updateCustomTaskData(this.player.name, this.taskData).then(
        res => {
          this.loading = false;
          this.isSent = true;
          this.saved.emit(this.taskData);
        },
        err => {
          this.err = 'Wystąpił błąd podczas zapisywania zmian.';
        }
      );
    }
  }

  reset() {
    const defaultCaseData = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT.cases));
    const selected = defaultCaseData.find(el => el.id === this.selectedCaseId);
    if (selected) {
      this.initForm(selected);
    }
  }

  addVersion() {
    const versions = this.caseForm.get('versions') as FormArray;
    versions.push(this.formBuilder.group({
      character: ['', Validators.required],
      stolenItem: ['', Validators.required],
      description: ['', Validators.required],
      notes: this.formBuilder.array([
        this.formBuilder.group({
          question: [''],
          answer: ['', Validators.required]
        }),
        this.formBuilder.group({
          question: [''],
          answer: ['', Validators.required]
        })])
    }));
    this.showVersion[versions.length - 1] = true;
  }

  deleteVersion(index: number) {
    const versions = this.caseForm.get('versions') as FormArray;
    versions.removeAt(index);
  }

  addQuestion(i: number) {
    const questions = this.caseForm.get('versions').get('' + i).get('notes') as FormArray;
    questions.push(this.formBuilder.group({
      question: [''],
      answer: ['', Validators.required]
    }));
  }

  private initForm(caseData: CaseData) {
    const caseFormData: CaseData = JSON.parse(JSON.stringify(caseData));

    this.caseForm = this.formBuilder.group({
      cluesNumber: [caseFormData.cluesNumber, [Validators.required,
        Validators.min(this.minCluesNumber), Validators.max(this.maxCluesNumber)]],
      versions: this.formBuilder.array(caseFormData.versions.map(ver => {
        return this.formBuilder.group({
          character: [ver.character, Validators.required],
          stolenItem: [ver.stolenItem, Validators.required],
          description: [ver.description, Validators.required],
          notes: this.formBuilder.array(ver.notes.map(note => {
            return this.formBuilder.group({
              question: [note.question],
              answer: [note.answer, Validators.required]
            });
          }))
        });
      })),
      searchingCommands: this.formBuilder.array(caseFormData.searchingCommands.map(command => {
        return this.formBuilder.group({
          item: [command.item, Validators.required],
          command: [command.command, Validators.required]
        });
      })),
      exercises: this.formBuilder.group({
        wordGroups: [caseFormData.exercises.wordGroups, [Validators.required, Validators.min(0), Validators.max(this.maxWordGroups)]],
        clozeTest: [caseFormData.exercises.clozeTest, [Validators.required, Validators.min(0), Validators.max(this.maxClozeTest)]],
        clozeTestReversed: [caseFormData.exercises.clozeTestReversed,
          [Validators.required, Validators.min(0), Validators.max(this.maxClozeTest)]],
      })
    }, {validator: this.cluesNumberValidator});
  }

  private cluesNumberValidator(frm: FormGroup) {
    return frm.get('cluesNumber').value <= frm.get('searchingCommands')['controls'].length ? null : {'cluesMax': true};
  }

}
