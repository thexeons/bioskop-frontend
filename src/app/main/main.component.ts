import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { FormGroup, FormControl, Validators  } from '@angular/forms';  
import { TicketService } from '../ticket.service';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private datac; 
  private dataf;
  private datao;
  private films;
  date: String = new Date().toDateString();
  customer: Customer;
  order: Order;
  custStatus: boolean = false;
  filmStatus: boolean = false;
  

  form = new FormGroup({  
    id : new FormControl('', Validators.required),
    name : new FormControl(),
    phone : new FormControl(),
    email : new FormControl()
  });  

  myForm = new FormGroup({  
    film : new FormControl('', Validators.required),
    filmName : new FormControl(),
    filmTime : new FormControl(),
    filmQuantity : new FormControl()
  });  

  constructor(private customerService : CustomerService, private ticketService : TicketService, private orderService : OrderService) { }

  ngOnInit() {
    this.order = new Order;
    this.ticketService.getData('').subscribe(  
      response => {  
        this.films = response.json();  
      });
  }

  getCustomerData(id: number)  
  {  
    if (this.form.invalid) return;
    this.customerService.getData(id).subscribe(  
      response => {  
        this.datac = response.json();  
        this.custStatus = true;
      },  
        error => {   
          let message: string;
          message = (error._body);
          alert(JSON.parse(message).message);
        }  
      );  
  }
  
  getFilmData(film: String)  
  {  
    if (this.myForm.invalid) return;
    this.ticketService.getData(film).subscribe(  
      response => {  
        if((JSON.parse(response['_body'])).length > 0)
        {
        this.dataf = response.json();  
        this.filmStatus = true;
        }
        else alert("Film name cannot be found");
      },  
        error => {  
          console.log("error while getting film Details");  
        }  
      );  
  }  

  postOrder()
  {
    if(!this.custStatus || !this.filmStatus || this.myForm.value.filmQuantity == null)
    {
      alert('Please make sure to fill all the details first!');
      return;
    }
    if(this.myForm.value.filmQuantity>this.dataf[0].quantity)
    {
      alert('Ticket stocks are limited! You can only buy maximum of the stocks available!\n\nCurrent stock: ' + this.dataf[0].quantity)
      return;
    }
    this.order.ticketId = this.dataf[0].ticketId;
    this.order.customerId = this.datac.customerId;
    this.order.buy = this.myForm.value.filmQuantity;
    this.orderService.postData(this.order)
      .subscribe(data => { console.log(data);
      this.datao = data; 
      alert('Order placed\n\n' + 'Your Order Number: ' + JSON.parse(data['_body']));
      location.reload(); 
    }, error => console.log(error));
    this.order = new Order();
    
  }
  
  searchCust(searchInfo1)  
  {  
       this.getCustomerData(this.form.value.id)
  }  
  
  searchFilm(searchInfo2)  
  {  
       this.getFilmData(this.myForm.value.film)
  }  

  resetFields()
  {
    this.myForm.reset();
    this.form.reset();
    this.dataf = null;
    this.datac = null;
  }

}
