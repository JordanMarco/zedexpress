import { Component } from '@angular/core';
import * as chartData from 'src/app/shared/data/charts/apexcharts';
import * as chartData1 from 'src/app/shared/data/charts/chartjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexGrid,
} from 'ng-apexcharts';

const DATA = [
  {
    id: 1,
    productsrc: './assets/img/ecommerce/products/1.png',
    src: './assets/img/users/2.jpg',
    name: 'Socrates Itumay',
    mail: 'socratesitumay@gmail.com',
    user: '#user1',
    userid: '#2343',
    product: 'Black Heals For Women',
    price: '$999',
    status: 'Success',
    bg: 'success',
    date: '10-12-2022',
  },
  {
    id: 2,
    productsrc: './assets/img/ecommerce/products/2.png',
    src: './assets/img/users/3.jpg',
    name: 'Json Taylor',
    mail: 'jsontaylor2416@gmail.com',
    user: '#user2',
    userid: '#5655',
    product: 'White Tshirt',
    price: '$699',
    status: 'Shipping',
    bg: 'info',
    date: '11-12-2022',
  },
  {
    id: 3,
    productsrc: './assets/img/ecommerce/products/3.png',
    src: './assets/img/users/4.jpg',
    name: 'Suzika Stallone',
    mail: 'suzikastallone3214@gmail.com',
    user: '#user3',
    userid: '#15245',
    product: 'Jacket for men',
    price: '$699',
    status: 'Out for Delivery',
    bg: 'warning',
    date: '12-12-2022',
  },
  {
    id: 4,
    productsrc: './assets/img/ecommerce/products/4.png',
    src: './assets/img/users/5.jpg',
    name: 'Selena Deoyl',
    mail: 'selenadeoyl114@gmail.com',
    user: '#user4',
    userid: '#45415',
    product: 'AirPods',
    price: '$299',
    status: 'Cancelled',
    bg: 'danger',
    date: '12-12-2022',
  },
  {
    id: 5,
    productsrc: './assets/img/ecommerce/products/5.png',
    src: './assets/img/users/6.jpg',
    name: 'Roman Killon',
    mail: 'romankillon143@gmail.com',
    user: '#user5',
    userid: '#35656',
    product: 'Jasmine Fragrance',
    price: '$299',
    status: 'Ordered',
    bg: 'primary',
    date: '13-12-2022',
  },
  {
    id: 6,
    productsrc: './assets/img/ecommerce/products/6.png',
    src: './assets/img/users/7.jpg',
    name: 'Charlie Davieson',
    mail: 'charliedavieson@gmail.com',
    user: '#user6',
    userid: '#622545',
    product: 'Smart Watch',
    price: '$299',
    status: 'Packed',
    bg: 'secondary',
    date: '13-12-2022',
  },
];

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};
export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  public apexData = chartData.ApexChartData;
  chartOptions: any;
  chartOptions1: any;
  chartOptions2: any;
  chartOptions3: any;
  optionsCircle1: any;
  constructor() {
    this.optionsCircle1 = {
      series: [30, 30, 50],
      colors: ['rgb(90,102,241)', '#60a5fa'],
      chart: {
        height: 245,
        type: 'donut',
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: '#525050',
          opacity: 0.1,
        },
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: '#fff',
        width: 0,
        dashArray: 0,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '80%',
            background: 'transparent',
            labels: {
              show: false,
              name: {
                show: false,
                fontSize: '20px',
                color: '#495057',
                offsetY: -4,
              },
              value: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 8,
                formatter: function (val: string) {
                  return val + '%';
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '22px',
                fontWeight: 600,
                color: '#495057',
              },
            },
          },
        },
      },
    };
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: 1996,
              y: 300,
            },
            {
              x: 1997,
              y: 824,
            },
            {
              x: 1998,
              y: 520,
            },
            {
              x: 1999,
              y: 750,
            },
            {
              x: 2000,
              y: 500,
            },
            {
              x: 2001,
              y: 800,
            },
            {
              x: 2002,
              y: 450,
            },
            {
              x: 2003,
              y: 900,
            },
            {
              x: 2004,
              y: 100,
            },
            {
              x: 2005,
              y: 300,
            },
          ],
          color: '#717df2',
        },
        {
          data: [
            {
              x: 1996,
              y: 1000,
            },
            {
              x: 1997,
              y: 650,
            },
            {
              x: 1998,
              y: 1000,
            },
            {
              x: 1999,
              y: 500,
            },
            {
              x: 2000,
              y: 1000,
            },
            {
              x: 2001,
              y: 400,
            },
            {
              x: 2002,
              y: 900,
            },
            {
              x: 2003,
              y: 450,
            },
            {
              x: 2004,
              y: 100,
            },
            {
              x: 2005,
              y: 300,
            },
          ],
          color: '#d1dae5',
        },
      ],
      chart: {
        type: 'area',
        height: 150,

        zoom: {
          enabled: false,
        },
        menu: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        dashArray: [0, 8, 5],
        width: 1,
      },
      legend: {
        show: false,
      },

      xaxis: {
        show: false,
        type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          show: false,
        },
      },
      fill: {
        colors: undefined,
        opacity: [0.1, 1],
        type: ['gradient', 'gradient'],
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 80, 100],
          colorStops: [],
        },
      },
      grid: {
        padding: {
          top: 0,
          right: -30,
          bottom: 0,
          left: -30,
        },
      },
    };

    this.chartOptions1 = {
      series: [
        {
          name: 'Income',
          data: [20, 38, 38, 72, 55, 63, 43, 76, 55, 80, 44, 80],
          color: '#434fe3',
        },
        {
          name: 'Expenses',
          data: [85, 65, 75, 38, 85, 35, 62, 40, 40, 64, 54, 89],
          color: '#d1dae5',
        },
      ],
      chart: {
        height: 300,
        type: 'bar',
      },
      responsive: true,
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5,
        },
      },

      legend: {
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        axisBorder: {
          color: 'rgba(119, 119, 142, 0.05)',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          color: 'rgba(119, 119, 142, 0.05)',
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        datalabels: {
          show: true,
        },
        categories: ['0', '20', '40', '60', '80', '100'],
      },

      grid: {
        borderColor: '#00000000',
      },
    };
    this.chartOptions2 = {
      series: [
        {
          data: [400, 470, 540, 690, 1100, 1380],
          color: '#5f69e7',
        },
      ],
      chart: {
        type: 'bar',
        height: 370,
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 1,
          colorStops: [
            {
              offset: 0,
              color: '#60a5fa',
              opacity: 1,
            },
            {
              offset: 100,
              color: '#5a66f1',
              opacity: 1,
            },
          ],
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 3,
          horizontal: true,
        },
      },
      colors: ['#5e76a6'],
      grid: {
        borderColor: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Facebook',
          'Instagram',
          'Dribble',
          'Twitter',
          'Chrome',
          'Pininterest',
        ],
        labels: {
          show: true,
          style: {
            colors: '#adb5be',
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: '#adb5be',
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
          },
        },
      },
    };
  }

  Itemdata = DATA;

  click = (id: number) => {
    const data = this.Itemdata.filter((x: { id: number }) => {
      return x.id != id;
    });
    this.Itemdata = data;
  };
  Products = [
    {
      src: './assets/img/ecommerce/products/13.png',
      category: 'Ethnic School bag for children (24L)',
      item: 'Bag',
      status: 'In Stock',
      price: '5,093',
    },
    {
      src: './assets/img/ecommerce/products/14.png',
      category: 'Leather jacket for men (S,M,L,XL)',
      item: 'Clothing',
      status: 'In Stock',
      price: '6,890',
    },
    {
      src: './assets/img/ecommerce/products/15.png',
      category: 'Childrens Teddy toy of high quality',
      item: 'Toys',
      status: 'Out of Stock',
      price: '5,423',
    },
    {
      src: './assets/img/ecommerce/products/16.png',
      category: 'Orange smart watch (24mm)',
      item: 'Fashion',
      status: 'Out of Stock',
      price: '10,234',
    },
    {
      src: './assets/img/ecommerce/products/17.png',
      category: 'Black Camera',
      item: 'Electronic',
      status: 'In Stock',
      price: '10,234',
    },
    {
      src: './assets/img/ecommerce/products/18.png',
      category: 'Hand Bag For Ladies',
      item: 'Fashion',
      status: 'Out of Stock',
      price: '1,034',
    },
  ];
  //Doughnut and Pie Chart Data
  public PieChartData = chartData1.PieChartData;
  public PieChartOptions = chartData1.PieChartOptions;
  public PieChartType = chartData1.PieChartType;
  public DoughnutChartType = chartData1.DoughnutChartType;
  ngOnInit() {}
}
