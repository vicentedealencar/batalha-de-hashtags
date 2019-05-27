import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  life: props => ({
    width: props.width,
    float: props.float,
    background: "yellow",
    height: "30px",
  }),
});

const useActiveBattle = () => {
  const [activeBattle, setActiveBattle] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const result = await fetch(
        "https://direita-vs-esquerda-api.herokuapp.com/api/v1/battles"
      );
      const battles = await result.json();
      const activeBattle = battles.find(x => x.active);
      console.log(activeBattle);
      if (!ignore) {
        setActiveBattle(activeBattle);
      }
    };

    fetchData();
    setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      ignore = true;
    };
  }, []);

  return activeBattle;
};

const Battle = () => {
  const activeBattle = useActiveBattle();

  if (!activeBattle) return <p>loading...</p>;

  return (
    <div className="battle-container">
      <div className="battle-top">
        <LifeBar
          floatPosition="right"
          battleChallanger={activeBattle.battleChallangers[0]}
        />
        <div className="battle-ko">KO</div>
        <LifeBar
          floatPosition="left"
          battleChallanger={activeBattle.battleChallangers[1]}
        />
      </div>
      <div className="battle-info">
        <div className="battle-hashtag">#{activeBattle.hashtags}</div>
        <div className="battle-name">{activeBattle.name}</div>
        <div className="battle-content">{activeBattle.content}</div>
      </div>
      <Fighters battleChallangers={activeBattle.battleChallangers} />
      <Audience tweets={tweetCountByChallenger(activeBattle)} />
      {/* <Timeline /> */}
    </div>
  );
};

export default Battle;

const LifeBar = ({ battleChallanger, floatPosition = [] }) => {
  const width =
    ((battleChallanger.health_point * 0.9) /
      battleChallanger.max_health_point) *
    100;
  const props = {
    width: width + "%",
    float: floatPosition,
  };
  const classes = useStyles(props);
  return (
    <div className="lifebar">
      <div className={classes.life} />
    </div>
  );
};

const Fighters = ({ battleChallangers = [] }) => (
  <div className="battle-fighters">
    {battleChallangers.map(x => (
      <div key={x.id}>
        <div className="hashtag">#{x.hashtags}</div>
        <img alt="personagem" src="./img/coxinha.png" />
      </div>
    ))}
  </div>
);

const Audience = ({ tweets = [] }) => (
  <div className="battle-audience">
    {tweets.map((x, i) => (
      <p key={i}>{x} tweets</p>
    ))}
  </div>
);

const tweetCountByChallenger = battle =>
  battle.tweets.reduce((acc, t) => {
    const index = battle.battleChallangers.findIndex(
      x => t.challanger_id === x.challanger_id
    );
    acc[index]++;
    return acc;
  }, Array.from({ length: battle.battleChallangers.length }).fill(0));

// const Timeline = () => {
//     return <div>
//         timeline
//     </div>
// }
