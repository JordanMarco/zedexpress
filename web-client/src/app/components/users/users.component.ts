import { Component } from '@angular/core';
const DATA = [
  {
    id: '#IN5252155',
    src: './assets/img/users/2.jpg',
    name: 'Socrates Itumay',
    mail: 'socratesitumany@abc.com',
    createddate: '25-09-2022',
    duedate: '15-10-2022',
    status: 'paid',
    background: 'success',
    text: 'success',
    paymode: 'card',
    price: '$999',
    address: 'P.O. Box 283 8562 Fusce Rd., 20620',
  },
  {
    id: '#IN2363363',
    src: './assets/img/users/3.jpg',
    name: 'Json Taylor',
    mail: 'jsontaylor2416@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Overdue',
    background: 'danger',
    text: 'danger',
    paymode: 'Net Banking',
    price: '$2526',
  },
  {
    id: '#IN125252',
    src: './assets/img/users/4.jpg',
    name: 'Suzika Stallone',
    mail: 'suzikastallone3214@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Due',
    background: 'warning',
    text: 'warning',
    paymode: 'UPI ID',
    price: '$2526',
  },
  {
    id: '#IN5656',
    src: './assets/img/users/5.jpg',
    name: 'Selena Deoyl',
    mail: 'selenadeoyl114@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Unpaid',
    background: 'secondary',
    text: 'secondary',
    paymode: 'Paypal',
    price: '$2526',
  },
  {
    id: '#IN25252',
    src: './assets/img/users/9.jpg',
    name: 'Roman Killon',
    mail: 'romankillon143@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Draft',
    background: 'primary',
    text: 'primary',
    paymode: 'Paypal',
    price: '$2526',
  },
  {
    id: '#IN5252155',
    src: './assets/img/users/10.jpg',
    name: 'Charlie Davieson',
    mail: 'charliedavieson@gmail.com',
    createddate: '25-09-2022',
    duedate: '15-10-2022',
    status: 'Paid',
    background: 'success',
    text: 'success',
    paymode: 'Card',
    price: '$999',
  },
  {
    id: '#IN2363363',
    src: './assets/img/users/11.jpg',
    name: 'Joseph Samurai',
    mail: 'josephsamurai@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Overdue',
    background: 'danger',
    text: 'danger',
    paymode: 'Net Banking',
    price: '$2526',
  },
  {
    id: '#IN125252',
    src: './assets/img/users/12.jpg',
    name: 'Kevin Powell',
    mail: 'kevinpowell@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Due',
    background: 'warning',
    text: 'warning',
    paymode: 'UPI ID',
    price: '$2526',
  },
  {
    id: '#IN5656',
    src: './assets/img/users/6.jpg',
    name: 'Darla Jung',
    mail: 'darlajung555@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Unpaid',
    background: 'secondary',
    text: 'secondary',
    paymode: 'Paypal',
    price: '$2526',
  },
  {
    id: '#IN25252',
    src: './assets/img/users/7.jpg',
    name: 'Kiara Advensh',
    mail: 'kiaraadvensh87@gmail.com',
    createddate: '12-09-2022',
    duedate: '20-10-2022',
    status: 'Draft',
    background: 'primary',
    text: 'primary',
    paymode: 'Paypal',
    price: '$2526',
  },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  datePickerConfig = {
    format: 'DD-MM-YY',
  };

  updateFormat() {
    this.datePickerConfig = {
      ...this.datePickerConfig,
      format: 'DD-MM-YY',
    };
  }
  Payments = DATA;

  click = (id: string) => {
    const data = this.Payments.filter((x: { id: string }) => {
      return x.id != id;
    });
    this.Payments = data;
  };

  isSelected = false;

  selectAll(event: Event): void {
    this.isSelected = (event.target as HTMLInputElement).checked;
  }

  input = 1;
  minus() {
    this.input++;
  }
  plus = () => {
    if (this.input > 0) {
      this.input--;
    }
  };
}
