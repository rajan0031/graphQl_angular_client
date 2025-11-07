import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { host } from '../../../utils/GraphQlApis';
import { AllMenusService } from '../../all-menus-service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class Form {
  menu = {
    name: '',
    price: 0,
    description: ''
  };

  constructor(private allMenusServices: AllMenusService) { // instance of AllMenusService

  }

  // subscribe to the menu list observable

  ngOnInit(): void {

    this.allMenusServices.menuList$.subscribe((data) => {
      console.log("current data", data)
    });

  }




  submitForm() {
    const mutation = `
    mutation {
      createMenu(menu: {
        name: "${this.menu.name}",
        price: ${this.menu.price},
        description: "${this.menu.description}"
      }) {
        id
        name
      }
    }
  `;

    axios.post(host, { query: mutation })
      .then(response => {
        console.log('Menu created:', response.data.data.createMenu);
        // Optionally reset form or show success message
        this.allMenusServices.fetchAllMenu()
      })
      .catch(error => {
        console.error('Error creating menu:', error);
        // Optionally show error message to user
      });
  }

}
