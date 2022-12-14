import { ModCallback } from "isaac-typescript-definitions";
import * as json from "json";
interface DangerHelperData {
  DangerBool: int | undefined;
  ZoneLink: unknown | undefined;
}

let ActiveEnemy = [] as Entity[];
let ActiveZone = [] as Entity[];
let ActiveProjectile = [] as Entity[];

main();

function mobDetection() {
  let entities = Isaac.GetRoomEntities();
  let enemy = [] as Entity[];
  if (entities.length === 0) {
  } else {
    entities.forEach((ent) => {
      if (
        ent.IsActiveEnemy(true) ||
        (ent.Type == 1000 && ent.Variant == 29) ||
        (ent.Type == 1000 && ent.Variant == 3480)//rev glasstro
      ) {
        enemy.push(ent);
      }
    });
  }
  ActiveEnemy = enemy;
}

function spawnCondition() {
  ActiveEnemy.forEach((ent) => {
    let data = ent.GetData() as unknown as DangerHelperData;
    let EntSprite = ent.GetSprite();
    //debugComing(ent, EntSprite, data);
    if((ent.ToNPC().State == 8 || ent.ToNPC().State == 9) && data.DangerBool !== 1){
      data.DangerBool = 1
      ent.SetColor(Color(1,1,1, 1, 0.7,0,0), 15, 1, true, false)
    }
    else{
      data.DangerBool = 0
      return
    }


  });
  //! security
}



function postUpdate() {
  mobDetection();
  spawnCondition();
}


function main() {
  const mod = RegisterMod("MonsterHelp", 1);
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.


  // //! MOD CONFIG MENU
  // //steal on another mod, idk how it's work
  // function postGameStarted() {
  //   if (mod.HasData()) {
  //     const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
  //       string,
  //       any
  //     >;

  //     for (const [k, v] of pairs(loadedFromSave)) {
  //       IRFconfig[k] = v;
  //     }
  //   }
  // }

  // function preGameExit() {
  //   mod.SaveData(json.encode(IRFconfig));
  // }

  // mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit);
  // mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  // if (ModConfigMenu !== undefined) {
  //   ModConfig(IRFconfig);
  // }
  // //! END MOD CONFIG MENU

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
}
