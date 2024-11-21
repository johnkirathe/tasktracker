import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatOption} from "@angular/material/core";
import {MatError, MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslationService} from "../../../services/translate.service";
import {Languages} from "../../../models/languages";
import {NgxtranslatehubDirective} from "ngx-translatehub";

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [],
  imports: [
    RouterLink,
    MatOption,
    MatSelect,
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    NgxtranslatehubDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  form: FormGroup = {} as FormGroup;
  fb = inject(FormBuilder);
  translationService = inject(TranslationService);
  languages = signal<Languages[]>([]);
  language = signal<string>('');
  translatedData: any = {};
  private readonly url = 'assets/i18n/header.json';

  ngOnInit(): void {
    this.getLanguages();
    this.language.set(this.translationService.getDefaultLanguage());
    this.loadTranslatedData();
    this.form = this.fb.group({
      lang: [this.language()]
    });
  }

  loadTranslatedData(): void {
    this.translationService.loadData(this.url, this.language(), undefined).subscribe(
      (translatedData) => {
        this.translatedData = translatedData.frontendData;
      },
      (error) => {
        console.error('Error while translating:', error);
      }
    );
  }

  getLanguages() {
    this.languages.set(this.translationService.getLanguages());
  }

  getLanguage() {
    this.language.set(this.form.value.lang); // Set the current language
    this.loadTranslatedData();
  }
}
