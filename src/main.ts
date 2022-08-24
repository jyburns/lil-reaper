import './style.css'
import { LilReaper } from './lilReaper'
import { MainMenuFormData } from './types';

let lilReaper: LilReaper;

const getMenuFormData = (): MainMenuFormData => {
  //@ts-ignore
  const values = Object.fromEntries(new FormData(document.forms.mainMenu));

  return {
    difficulty: values.difficulty
  };
}

const getBodySize = (): {height: number, width: number} => {
  const body = document.getElementsByTagName('body')[0];

  return {
    height: body.clientHeight,
    width: body.clientWidth
  };
}

const showMainMenu = () => {
  const dialog = document.getElementById('menuDialog') as HTMLDialogElement;

  //@ts-ignore
  dialog.show();
}

const closeMainMenu = () => {
  const dialog = document.getElementById('menuDialog') as HTMLDialogElement;

  //@ts-ignore
  dialog.close('startGame');
};

const mainLoop = () => {
  window.requestAnimationFrame(mainLoop);

  lilReaper.run();
};

const onMainMenuSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const menuData = getMenuFormData();

  lilReaper = new LilReaper('lilReaper', {
    difficulty: menuData.difficulty
  });

  const {height, width} = getBodySize();

  lilReaper.setCanvasSize(height, width);
  lilReaper.draw();

  closeMainMenu();

  mainLoop();

  lilReaper.start();
}

window.addEventListener('load', () => {
  const form = document.getElementById('mainMenu') as HTMLFormElement;

  showMainMenu();

  form!.addEventListener('submit', onMainMenuSubmit);
});

window.addEventListener('resize', (_) => {
  if (!lilReaper) {
    return;
  }

  const {height, width} = getBodySize();

  lilReaper.setCanvasSize(height, width);
});

window.addEventListener('death', () => {
  console.warn('ur ded');
});
