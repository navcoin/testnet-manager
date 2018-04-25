
import {DropletModel} from "./droplet-model";

export function dropletDataParser(rawResp: any, existingData: DropletModel[]) {

  const dataArr = rawResp.data;

  dataArr.forEach((item) => {

    let isFound = false;
    existingData.forEach( (existingItem: DropletModel) => {

      if (existingItem.name == item.name) {

        existingItem.name = item.name;
        existingItem.initialData = item.initialData;
        existingItem.currentDropletData = item.currentDropletData;
        existingItem.callBackURL = item.callBackURL;
        existingItem.repoBranch = item.repoBranch;
        existingItem.repoURL = item.repoURL;
        existingItem.logs = item.logs.reverse();

        isFound = true;
      }

    });


    if (!isFound) {
      let model: DropletModel = {} as DropletModel;
      model.name = item.name;
      model.initialData = item.initialData;
      model.currentDropletData = item.currentDropletData;
      model.callBackURL = item.callBackURL;
      model.repoBranch = item.repoBranch;
      model.repoURL = item.repoURL;
      model.logs = item.logs.reverse();

      existingData.push(model);
    }


  });

}


