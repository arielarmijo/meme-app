import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meme, GetMemeResponse } from '../types/get-meme-response.interface';
import { catchError, find, map, Observable, of, tap, throwError } from 'rxjs';
import { NewMemeRequest } from '../types/new-meme-request.interface';
import { Data, NewMemeResponse } from '../types/new-meme-response.interface';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class MemeService {

  private memes$: Observable<Meme[]>;
  private localStoragekey = 'memes';

  constructor(private http: HttpClient, private auth: AuthService) {
    const url = `${environment.imgFlipBaseUrl}/get_memes`;
    const findTwoBoxedMemes = (meme: Meme): boolean => meme.box_count === 2;
    this.memes$ = this.http.get<GetMemeResponse>(url).pipe(
      map(mr => mr.data.memes.filter(findTwoBoxedMemes)),
      catchError(this.handeError)
    );
  }

  saveMeme(meme: Meme): void {
    const memesString = localStorage.getItem(this.localStoragekey);
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    this.auth.user$.subscribe(user => {
      localStorage.setItem(this.localStoragekey, JSON.stringify([...memes, {...meme, author: user?.email}]));
    });
  }

  deleteMeme(id: string): void {
    const memesString = localStorage.getItem(this.localStoragekey);
    if (!memesString) return;
    const memes: Meme[] = JSON.parse(memesString);
    localStorage.setItem(this.localStoragekey, JSON.stringify(memes.filter(meme => meme.id !== id)));
  }

  getMakedMemes(): Meme[] {
    const memesString = localStorage.getItem(this.localStoragekey);
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    return memes.reverse();
  }

  getMakedMeme(id: string): Meme | undefined {
    const memesString = localStorage.getItem(this.localStoragekey);
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    return memes.find(meme => meme.id === id);
  }

  getMyMemes(author: string): Meme[] {
    const memesString = localStorage.getItem(this.localStoragekey);
    const memes: Meme[] = memesString ? JSON.parse(memesString) : [];
    return memes.filter(meme => meme.author === author).reverse();
  }

  getMemes(): Observable<Meme[]> {
    return this.memes$;
  }

  getMeme(id: string): Observable<Meme | undefined> {
    return this.memes$.pipe(
      map(memes => memes.find(meme => meme.id === id))
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