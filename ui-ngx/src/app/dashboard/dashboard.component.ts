import {Component, OnInit} from '@angular/core';
import {TickerService} from '../../shared/services/ticker/ticker.service';

// declare var TradingView;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _tickerService: TickerService
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
