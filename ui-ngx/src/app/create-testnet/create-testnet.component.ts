import {Component, OnInit} from '@angular/core';

// declare var TradingView;

@Component({
  selector: 'app-create-testnet',
  templateUrl: './create-testnet.component.html',
  styleUrls: ['./create-testnet.component.scss']
})
export class CreateTestnetComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {

    // new TradingView.MediumWidget({
    //   "container_id": "tv-medium-widget-54b92",
    //   "symbols": [
    //     [
    //       "USD",
    //       "BITTREX:NAVUSD|1y"
    //     ],
    //     [
    //       "Bitcoin",
    //       "BITTREX:NAVBTC|1y"
    //     ]
    //   ],
    //   "greyText": "Quotes by",
    //   "gridLineColor": "#e9e9ea",
    //   "fontColor": "#83888D",
    //   "underLineColor": "rgba(152, 0, 255, 0.29)",
    //   "trendLineColor": "rgba(152, 0, 255, 1)",
    //   "width": "100%",
    //   "height": "400px",
    //   "locale": "en"
    // });

  }

}
