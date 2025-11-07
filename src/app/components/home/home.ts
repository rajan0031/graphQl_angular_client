import { Component } from '@angular/core';
import { Form } from '../form/form';
import { AllMenusService } from '../../all-menus-service';
import { CommonModule } from '@angular/common';
import { UpdateForm } from '../update-form/update-form';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { host } from '../../../utils/GraphQlApis';

@Component({
  selector: 'app-home',
  imports: [Form, CommonModule, UpdateForm, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  flag: Boolean = false;
  menus: any[] = [];
  editFlag: Boolean = false;
  updateFormDetails: any[] = []

  constructor(private allMenusServices: AllMenusService) { }

  ngOnInit(): void {
    this.allMenusServices.menuList$.subscribe((data) => {
      this.menus = data;
    })
    this.allMenusServices.fetchAllMenu();
  }



  handleAddMenu() {

    this.flag = true;

  }


  editMenu(menu: any) {
    this.editFlag = true;
    console.log(menu);
    this.updateFormDetails = menu;
  }


  async deleteMenu(id: any) {
    console.log('Deleting menu with ID:', id);

    const mutation = `
    mutation {
      deleteMenu(menuId: ${id})
    }
  `;

    try {
      const response = await axios.post(host, { query: mutation });
      console.log('Delete response:', response.data.data.deleteMenu);
      this.allMenusServices.fetchAllMenu();
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  }


}
