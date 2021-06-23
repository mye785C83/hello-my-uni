import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { GedConversionService } from './ged-conversion.service';
import { GedConversionResult, GedConversionTable } from './ged-conversion.model';

@Component({
  selector: 'app-ged-conversion',
  templateUrl: './ged-conversion.component.html',
  styleUrls: ['./ged-conversion.component.scss']
})
export class GedConversionComponent implements OnInit {
  // data: object;
  renewal = true;
  result = false;
  type = 6;
  tableTab = 1;
  tableNumber: number[] = [];
  conversionResult: GedConversionTable[] = [];
  exampleResult = [
      {
        university : '강원대학교',
        area: '경기',
        converted : 663.56,
      },
      {
        university : '아사렛대학교',
        area: '전남',
        converted : 10.1,
      },
      {
        university : '나다대학교',
        area: '경기',
        converted : 56,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      },
      {
        university : '아주대학교',
        area: '서울/경기',
        converted : 43,
      },
      {
        university : '서강대학교',
        area: '서울/경기',
        converted : 93.56,
      },
      {
        university : '전남대학교',
        area: '전남',
        converted : 300,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      },
      {
        university : '제주대학교',
        area: '제주',
        converted : 66,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      }
  ];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.result = false;
  }


  createResultList(result: any): void{
    let aTableCell = 0;
    let tableId = 1;
    let aTableList: GedConversionResult[] = [];
    for (let i = 0; i < this.type; i++){
      const typeSize = result[i].length;
      for (let j = 0; j < typeSize; j++){
        if (result[i][j].converted){
          const aResult = new GedConversionResult(
            result[i][j].university,
            result[i][j].area,
            result[i][j].converted,
            result[i][j].link
          );
          aTableList.push(aResult);
          aTableCell += 1;
        }
        if (aTableCell === 10 || (j === typeSize - 1 && i === this.type - 1)){
          if (aTableCell < 10){
            for (let k = aTableCell; k < 10; k++){
              aTableList.push(new GedConversionResult(
                '  ',
                '  ',
                null,
                null
              ));
            }
          }
          console.log(aTableList);
          this.conversionResult.push(
            new GedConversionTable(
              tableId,
              aTableList
            )
          );
          this.tableNumber.push(tableId);
          tableId += 1;
          aTableList = [];
          aTableCell = 0;
        }
      }
    }
    console.log(this.conversionResult);
    this.result = true;
    const eleMoveTo = document.getElementById('table');
    if (eleMoveTo != null){
      window.scrollTo(0, eleMoveTo.offsetTop - 50);
    }
  }


  onSubmit(f: NgForm): void{
    console.log(f.value);

    f.value.status = '0';

    console.log(f.value);

    if (this.renewal){
      this.http.get<GedConversionService>('https://site.hellomyuni.com/api/converter/each',
        {
          params: f.value,
          responseType: 'json',
        })
        .subscribe(
          (val) => {
            console.log(val.result);
            this.createResultList(val.result);
          },
          err => {
            console.log(err);
          },
          () => {
            console.log('complete');
          }
        );
    }else{
      alert('서버 리뉴얼 중입니다. 6월 중 재개 예정입니다.');
      this.result = true;

      const eleMoveTo = document.getElementById('table');
      if (eleMoveTo != null){
        window.scrollTo(0, eleMoveTo.offsetTop - 50);
      }
    }
  }

  tabTable(i: number): void{
    this.tableTab = i;
  }
}
