
import {DropletModel} from "./droplet-model";

export function dropletDataParser(rawResp: any): DropletModel[] {

  let rArr: DropletModel[] =  [];

  const dataArr = rawResp.data;

  dataArr.forEach((item) => {

    let model: DropletModel = {} as DropletModel;
    model.name = item.name;
    model.initialData = item.initialData;
    model.currentDropletData = item.currentDropletData;
    model.callBackURL = item.callBackURL;
    model.repoBranch = item.repoBranch;
    model.repoURL = item.repoURL;
    model.logs = item.logs.reverse();

    rArr.push(model);


  });

  return rArr;


}


