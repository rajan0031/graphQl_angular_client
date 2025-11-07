import { Injectable } from '@angular/core';
import axios from 'axios';
import { host } from '../utils/GraphQlApis';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AllMenusService {

  menuSubject = new BehaviorSubject<any>([])
  menuList$ = this.menuSubject.asObservable();


  async fetchAllMenu() {
    const query = `
    query {
      menus {
        id
        name
        price
        description
      }
    }
  `;

    try {
      const response = await axios.post(host, { query });
      const menus = response.data.data.menus;
      this.menuSubject.next(menus); // ✅ Push data to subscribers
    } catch (error) {
      console.error('Error fetching menus:', error);
      this.menuSubject.next([]); // Optional: clear list on error
    }
  }



}
