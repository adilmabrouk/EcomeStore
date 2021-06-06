import { ITypes } from './../shared/models/productTypes';
import { IBrands } from './../shared/models/productBrands';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  @ViewChild('search', {static : true}) searchTerm!: ElementRef;
  products!: IProduct[];
  brands!: IBrands[] ;
  types!: ITypes[] ;
  mediaSub!: Subscription;
  isOpen: boolean = false;
  brandSelected = 0;
  typeSelected = 0;
  sortSelected = '';
  sortOption = [
    {name: 'Alphabatecal', value: ''},
    {name: 'Price : Low To High', value: 'priceAsc'},
    {name: 'Price : High To Low', value: 'priceDesc'}
  ];
  search!: string;
  pageNumber!: number;
  pageSize!: number;
  totalCount!: number;

  slides = [
    {image: 'assets/pic1.jpg'},
    {image: 'assets/pic.jpg'},
    {image: 'assets/pic2.jpg'},
    {image: 'assets/pic1.jpg'},
    {image: 'assets/pic1.jpg'},
    {image: 'assets/pic2.jpg'},
    {image: 'assets/pic.jpg'},
    {image: 'assets/pic1.jpg'}
  ];

  constructor(private shopService: ShopService , private mediaObserver: MediaObserver) { }

  ngOnInit(): void {

    this.toggleSideBar();
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  //Get Products
  getProducts()
  {
    this.shopService.getProducts(this.brandSelected,this.typeSelected, this.sortSelected, this.search, this.pageNumber, this.pageSize).subscribe(response =>{
      this.products = response.data;
      this.pageNumber = response.pageIndex;
      this.pageSize  = response.pageSize;
      this.totalCount = response.count;

    },
    error =>
    {
      console.log(error);
    })
  }

  //Get Brands
    getBrands()
    {
      this.shopService.getBrands().subscribe(response =>{
        this.brands = [{id: 0, name: 'All'}, ...response];
      },
      error =>
      {
        console.log(error);
      })
    }

    //Get Types
     getTypes()
      {
          this.shopService.getTypes().subscribe(response =>{
            this.types = [{id: 0, name: 'All'}, ...response];
          },
          error =>
          {
            console.log(error);
          })
      }

  onBrandSelected(brandId : number)
  {
      this.brandSelected = brandId;
      this.getProducts();
  }

  onTypeSelected(typeId : number)
  {
      this.typeSelected = typeId;
      this.pageNumber = 1;
      this.getProducts();
  }

  onSortSelected(sort : string)
  {
      this.sortSelected = sort;
      this.pageNumber = 1;
      this.getProducts();
  }

  onPageChanged(event: any)
  {
    this.pageNumber = event;
    this.getProducts();
  }

  //search
  onSearch()
  {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.search = ''
    this.getProducts();
  }

  //Closing Sidebar
  toggleSideBar()
  {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{

      this.isOpen = result.mqAlias === 'xs' || result.mqAlias === 'sm' ? false : true;
    });
  }
  //Navbar Toggle
  toggle()
  {
    this.isOpen = !this.isOpen
  }

}

