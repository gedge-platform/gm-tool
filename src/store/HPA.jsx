import { makeAutoObservable, runInAction, toJS } from "mobx";

class HPA {
	viewList = null;
	totalElements = 0;
  totalPages = 1;
  currentPage = 1;

	hpaWorkspaceList = [];
	hpaProjectList = [];
	hpaClusterList = [];
	hpaDeploymentList = [];

  constructor() {
    makeAutoObservable(this);
  }

	goPrevPage = () => {
    runInAction(() => {
      
    });
  };

  goNextPage = () => {
    runInAction(() => {
      
    });
  };








}


const hpaStore = new HPA();
export default hpaStore;