import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meme, GetMemeResponse } from '../types/get-meme-response.interface';
import { catchError, find, map, Observable, of, tap, throwError } from 'rxjs';
import { NewMemeRequest } from '../types/new-meme-request.interface';
import { Data, NewMemeResponse } from '../types/new-meme-response.interface';

@Injectable()
export class MemeService {

  private memes$: Observable<Meme[]>;

  constructor(private http: HttpClient) {
    const url = `${environment.imgFlipBaseUrl}/get_memes`;
    const findTwoBoxMemes = (meme: Meme): boolean => meme.box_count === 2;
    this.memes$ = this.http.get<GetMemeResponse>(url).pipe(map(mr => mr.data.memes.filter(findTwoBoxMemes)));
  }

  saveMeme(meme: Meme) {
    const memesString = localStorage.getItem('memes');
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    localStorage.setItem('memes', JSON.stringify([...memes, meme]));
  }

  getMakedMemes(): Meme[] {
    const memesString = localStorage.getItem('memes');
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    return memes.reverse();
  }

  getMakedMeme(id: string): Meme | undefined {
    const memesString = localStorage.getItem('memes');
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    return memes.find(meme => meme.id === id);
  }

  getMemes(): Observable<Meme[]> {
    return this.memes$;
  }

  getMeme(id: string): Observable<Meme> {
    return this.memes$.pipe(
      map(memes => memes.find(meme => meme.id === id) as Meme)
    );
  }

  newMeme(meme: NewMemeRequest): Observable<Data> {
    console.log('creando meme: ', meme);
    const url = `${environment.imgFlipBaseUrl}/caption_image`;
    const params = new HttpParams()
      .append('template_id', meme.template_id)
      .append('username', environment.username)
      .append('password', environment.password)
      .append('text0', meme.text0)
      .append('text1', meme.text1);
    const options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    };
    return this.http.post<NewMemeResponse>(url, params, options).pipe(
      map(res => res.data),
      catchError(this.handeError)
    );
  }

  private handeError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}