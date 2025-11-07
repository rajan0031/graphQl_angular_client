import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { host } from '../../../utils/GraphQlApis';
import { AllMenusService } from '../../all-menus-service';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-form.html',
  styleUrls: ['./update-form.css'],
})
export class UpdateForm implements OnChanges {


  @Input() data: any;



  menu = {
    name: '',
    price: 0,
    description: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.menu = {
        name: this.data.name,
        price: this.data.price,
        description: this.data.description
      };
    }
  }



  constructor(private allMenusServices: AllMenusService) { }

  // subscribe the service if needed here



  ngOnInit(): void {
    if (this.data) {
      this.menu = {
        name: this.data.name,
        price: this.data.price,
        description: this.data.description
      };
    }

    this.allMenusServices.menuList$.subscribe((data) => {
      console.log("Current data from the database:", data);
    });
  }

  async submitForm() {
    console.log('Updated menu:', this.menu);

    const mutation = `
  mutation {
    updateMenu(menuId: ${this.data.id}, menu: {
      name: "${this.menu.name}",
      price: ${this.menu.price},
      description: "${this.menu.description.replace(/"/g, '\\"')}"
    }) {
      id
      name
    }
  }
`;


    try {
      const response = await axios.post(host, { query: mutation });
      console.log('Menu updated:', response.data.data);
      this.allMenusServices.fetchAllMenu();
    } catch (err) {
      console.error('Error updating menu:', err);
    }
  }


}
