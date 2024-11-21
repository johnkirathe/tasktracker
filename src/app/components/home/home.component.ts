import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from "@angular/router";
import {TranslationService} from "../../services/translate.service";
import {NgxtranslatehubDirective} from "ngx-translatehub";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, MatIconModule, MatListModule, MatButtonModule, RouterLink, NgxtranslatehubDirective],
})
export class HomeComponent implements OnInit {
  title = `Hello`;
  translationService = inject(TranslationService);
  language = signal<string>('');
  translatedData: any = {};
  private readonly url = 'assets/i18n/home.json';
  injector = inject(Injector);

    constructor() {
        effect(
          () => {
            const currentLanguage = this.translationService.getDefaultLanguage();
            this.language.set(currentLanguage); // Update the signal
            console.log('this.language:::: ',this.language())
            this.loadTranslatedData();
          },
          { allowSignalWrites: true } // Enable signal writes in the effect
        );
  }

  ngOnInit(): void {
    this.language.set(this.translationService.getDefaultLanguage());
    this.loadTranslatedData();
  }

  loadTranslatedData(): void {
    this.translationService.loadData(this.url, this.language(), undefined).subscribe(
      (translatedData) => {
        this.translatedData = translatedData.frontendData;
        console.log('Translated Data:', this.translatedData);
      },
      (error) => {
        console.error('Error while translating:', error);
      }
    );
  }
}
