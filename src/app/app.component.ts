import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dog } from './interfaces/dog.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  dogFc: string = '';
  listed: Dog[] = [];
  examining: Dog[] = [];
  hooman: Dog[] = [];
  id: number = 0;
  private _cd = inject(ChangeDetectorRef);
  ngOnInit(): void {
    
  }
  addDog() {
    this.id++
    this.listed.push({id: this.id, dogName: this.dogFc});
    this.dogFc = '';
  }
  next(step: number, id: number) {
    if (step === 1) {
      const listInd = this.listed.findIndex(x => x.id === id);
      this.examining.push(this.listed[listInd]);
      this.listed.slice(listInd, 1);
    } else {
      const examiningInd = this.examining.findIndex(x => x.id === id);
      this.hooman.push(this.examining[examiningInd]);
      this.examining.slice(examiningInd, 1);
    }
    this._cd.detectChanges();
  }
}
