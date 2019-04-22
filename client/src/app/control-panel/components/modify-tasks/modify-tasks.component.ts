import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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

  chooseEdit = true;
  editCase = false;

  caseForm: FormGroup;
  selectedCaseId: number;
  selectedCaseScene: string;

  minVersionsArray = 1;
  minQuestionsArray = 2;
  minCluesArray = 6;
  minSearchingCommands = 5;
  minWordGroupsArray = 7;
  minClozeTestArray = 7;
  minAnswersArray = 4;

  minCluesNumber = 3;
  maxCluesNumber = 6;
  maxWordGroups = 7;
  maxClozeTest = 7;

  showVersions = false;
  showVersion: {[key: number]: boolean} = {};
  showClues = false;
  showSingleChoice = false;

  sharedForm: FormGroup;

  showSharedClues = false;
  showExercises = false;
  showWordGroups = false;
  showClozeTest = false;

  lastModified: Date;

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
    // this.maxWordGroups = this.taskData.exercises.wordGroups.length;
    // this.maxClozeTest = this.taskData.exercises.clozeTest.length;
  }

  selectEdit(change: MatSelectChange) {
    this.chooseEdit = false;
    if (change.value === 'case') {
      this.editCase = true;
    } else if (change.value === 'shared') {
      const sharedFormData: SourceTaskData = JSON.parse(JSON.stringify(this.taskData));
      this.initSharedForm({clues: sharedFormData.clues, exercises: sharedFormData.exercises});
    }
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
      this.controlService.updateCustomTaskData(this.player.name, this.taskData, 'case_' + this.selectedCaseId).then(
        res => {
          this.player.customTaskModified.push({contentType: 'case_' + this.selectedCaseId, date: new Date()});
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

  saveShared() {
    if (this.sharedForm.valid) {
      this.loading = true;
      const update = this.sharedForm.getRawValue();
      this.taskData.exercises = update.exercises;
      this.taskData.clues = update.clues;
      this.controlService.updateCustomTaskData(this.player.name, this.taskData, 'shared').then(
        res => {
          this.player.customTaskModified.push({contentType: 'shared', date: new Date()});
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

  resetShared() {
    const defaultTaskData = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
    const sharedFormData: SourceTaskData = JSON.parse(JSON.stringify(defaultTaskData));
    this.initSharedForm({clues: sharedFormData.clues, exercises: sharedFormData.exercises});
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

  addWord(i: number) {
    const words = this.sharedForm.get('exercises').get('wordGroups').get('' + i) as FormArray;
    words.push(this.formBuilder.control('', Validators.required));
  }

  addWordGroup() {
    const wordGroups = this.sharedForm.get('exercises').get('wordGroups') as FormArray;
    const empty = ['', '', '', ''];
    wordGroups.push(this.formBuilder.array(empty.map(word => this.formBuilder.control(word))));
  }

  addClozeAnswer(i: number, type: string) {
    const answers = this.sharedForm.get('exercises').get('clozeTest').get('' + i).get(type) as FormArray;
    answers.push(this.formBuilder.control('', Validators.required));
  }

  addCloze() {
    const cloze = this.sharedForm.get('exercises').get('clozeTest') as FormArray;
    const empty = ['', '', '', ''];
    cloze.push(this.formBuilder.group({
      sentence: this.formBuilder.control('', [Validators.required, this.hasGapValidator]),
      correct: this.formBuilder.array(empty.map(cor => this.formBuilder.control(cor, Validators.required))),
      incorrect: this.formBuilder.array(empty.map(incor => this.formBuilder.control(incor, Validators.required)))
    }));
  }

  private initForm(caseData: CaseData) {
    this.lastModified = this.getLastModified('case_' + this.selectedCaseId);
    const caseFormData: CaseData = JSON.parse(JSON.stringify(caseData));

    this.caseForm = this.formBuilder.group({
      cluesNumber: [caseFormData.cluesNumber, [Validators.required,
        Validators.min(this.minCluesNumber), Validators.max(this.maxCluesNumber)]],
      versions: this.formBuilder.array(caseFormData.versions.map(ver =>
        this.formBuilder.group({
          character: [ver.character, Validators.required],
          stolenItem: [ver.stolenItem, Validators.required],
          description: [ver.description, Validators.required],
          notes: this.formBuilder.array(ver.notes.map(note =>
            this.formBuilder.group({
              question: [note.question],
              answer: [note.answer, Validators.required]
            })
          ))
        })
      )),
      searchingCommands: this.formBuilder.array(caseFormData.searchingCommands.map(command =>
        this.formBuilder.group({
          item: [command.item, Validators.required],
          command: [command.command, Validators.required]
        })
      )),
      exercises: this.formBuilder.group({
        wordGroups: [caseFormData.exercises.wordGroups, [Validators.required, Validators.min(0), Validators.max(this.maxWordGroups)]],
        clozeTest: [caseFormData.exercises.clozeTest, [Validators.required, Validators.min(0), Validators.max(this.maxClozeTest)]],
        clozeTestReversed: [caseFormData.exercises.clozeTestReversed,
          [Validators.required, Validators.min(0), Validators.max(this.maxClozeTest)]],
      })
    }, {validator: this.cluesNumberValidator});
  }

  private initSharedForm(sharedFormData: Partial<SourceTaskData>) {
    this.lastModified = this.getLastModified('shared');

    this.sharedForm = this.formBuilder.group({
      clues: this.formBuilder.group({
        jobs: this.formBuilder.array(sharedFormData.clues.jobs.map(job => this.cluesFormGroup(job))),
        other: this.formBuilder.array(sharedFormData.clues.other.map(other => this.cluesFormGroup(other)))
      }),
      exercises: this.formBuilder.group({
        wordGroups: this.formBuilder.array(sharedFormData.exercises.wordGroups.map(group =>
          this.formBuilder.array(group.map(word => this.formBuilder.control(word)))
        )),
        clozeTest: this.formBuilder.array(sharedFormData.exercises.clozeTest.map(cloze =>
          this.formBuilder.group({
            sentence: this.formBuilder.control(cloze.sentence, [Validators.required, this.hasGapValidator]),
            correct: this.formBuilder.array(cloze.correct.map(cor => this.formBuilder.control(cor, Validators.required))),
            incorrect: this.formBuilder.array(cloze.incorrect.map(incor => this.formBuilder.control(incor, Validators.required)))
          })
        ))
      })
    });
  }

  private cluesFormGroup(group): FormGroup {
    return this.formBuilder.group({
      name: [group.name, Validators.required],
      description: this.formBuilder.group({
        male: [group.description.male, Validators.required],
        female: [group.description.female, Validators.required]
      })
    });
  }

  private cluesNumberValidator(frm: FormGroup) {
    return frm.get('cluesNumber').value <= frm.get('searchingCommands')['controls'].length ? null : {'cluesMax': true};
  }

  private hasGapValidator(control: FormControl) {
    return control.value && !control.value.includes('*') ? {'noGap': true} : null;
  }

  private getLastModified(type: string): Date {
    const modifications = this.player.customTaskModified.filter(el => el.contentType === type);
    const lastModified = modifications && modifications.length ? Math.max(...modifications.map(el => new Date(el.date).getTime())) : null;
    return lastModified ? new Date(lastModified) : null;
  }

}
