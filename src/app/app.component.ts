import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, first, from, fromEvent, interval, map, mapTo, mergeMap, of, skipUntil, switchMap, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rjxproject';
  constructor() {

  }
  ngOnInit(): void {
    const myclick = fromEvent(document, "click");
    myclick.pipe(switchMap((x) => timer(3000))).subscribe(x => {
      console.log("tıklandı");
    }
    )

    const click = fromEvent(document, 'click');
    click.pipe(mapTo("merhaba")).subscribe(x => {
      console.log(x)
    }

    );

    let names = from([
      { name: "ahmet", surname: "yıldırım", email: "ahmet@gmail.com" },
      { name: "selim", surname: "yıldırım", email: "selim@gmail.com" },
      { name: "mehmet", surname: "yıldırım", email: "mehmet@gmail.com" }


    ]);

    names.pipe(map(x => `${x.name} ${x.surname} (${x.email})`)).subscribe(x => {
      console.log(x);
    });
    names.pipe(mapTo("sabit değer")).subscribe(x => {
      console.log(x);
    });
    var stringArray = of("a", "b", "c", "d");
    var numberArray = of(1, 2, 3);
    stringArray.pipe(mergeMap(x => numberArray.pipe(map(y => x + y)))).subscribe(x => {

      console.log(x);
    });

    ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').subscribe(x => {
      console.log(x);
    });
    var data = interval(1000).pipe(map(val => {
      if (val > 6) {
        throw "değer 6'dan büyük olamaz"
      }
      return val;
    }), catchError(e => of(`hata: ${e}`)))

    data.subscribe({
      next: (val) => { console.log(val) },
      error: (e) => { console.log(`bu hata subscribe tarafından ele alındı`) }
    })

  }


  /*const map =new Map();
  map.set(1,"kitap1");
  map.set(2,"kitap2");
  map.set(3,"kitap3");
  const myArray=from([5,7,9,12,13,15,17,20])
  const myArray2=interval(1000);
myArray.pipe(first(x=>x>15)).subscribe(x=>{
  console.log(x);
})
myArray.pipe(filter(x=>x>15)).subscribe(x=>{
  console.log(x);
})
myArray.pipe(takeWhile(x=>x<15)).subscribe(x=>{
  console.log(x);
})
myArray2.pipe(skipUntil(timer(5000))).subscribe(x=>{
  console.log(x);
})
 
  let myObservable=from(map);
 
  
    myObservable.subscribe({
    next:(val)=>console.log(`key:${val[0]}, value:${val[1]}`),
    error:(e)=>console.log(e),
    complete:()=>{console.log("Data yayınlama sona erdi")}
  
    })  ;
 
    };*/


}


