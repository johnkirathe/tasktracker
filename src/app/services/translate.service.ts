import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Languages} from "../models/languages";
import {NgxtranslatehubService} from "ngx-translatehub";

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private language = signal('');
  private readonly destroyRef = inject(DestroyRef);
  private readonly translationService = inject(NgxtranslatehubService);
  private readonly http = inject(HttpClient);

  getDefaultLanguage(): string {
    this.language.set(this.translationService.getLocaleLanguage());
    return this.language();
  }

  setDefaultLanguage(language: string): void {
    this.language.set(language);
    this.translationService.setLocaleLanguage(language);
  }

  getLanguages(): Languages[] {
    let languages: Languages[] = [];
    this.translationService.getLanguages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: Languages[]) => {
        languages = response;
      });
    return languages;
  }

  loadData(url: string, lang: string, backendData: any): Observable<any> {
    return this.translationService.loadData(url, lang, backendData);
  }

}
