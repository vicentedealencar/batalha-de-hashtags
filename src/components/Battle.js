import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TwitterShareButton } from "react-twitter-embed";
import Loading from "./Loading";

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
        // "https://direita-vs-esquerda-api.herokuapp.com/api/v1/battles"
        "http://localhost:3333/api/v1/battles"
      );
      const battles = await result.json();
      const activeBattle = battles.find(x => x.active);
      // console.log(activeBattle);
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

  if (!activeBattle)
    return (
      <div className="battle-container">
        <Loading />
      </div>
    );

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
      <Fighters
        battleChallangers={activeBattle.battleChallangers}
        slug={activeBattle.slug}
        hastagBattle={activeBattle.hashtags}
      />
      <Audience tweets={tweetCountByChallenger(activeBattle)} />
      {/* <Timeline /> */}
    </div>
  );
};

export default Battle;

const LifeBar = ({ battleChallanger, floatPosition = [] }) => {
  let width =
    (battleChallanger.health_point / battleChallanger.max_health_point) * 100;

  if (width > 99.9) {
    width = 95;
  }
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

const Fighters = ({ battleChallangers, hastagBattle, slug }) => {
  return (
    <div className="battle-fighters">
      {battleChallangers.map((x, i) => (
        <div key={x.id}>
          <div className="hashtag">#{x.hashtags}</div>
          <div className="twitter-share">
            <TwitterShareButton
              url={window.location.href}
              options={{
                text: "#" + hastagBattle + " #" + x.hashtags,
                // via: "saurabhnemade",
                size: "large",
                // screenName: "Clique aqui para compartilhar",
              }}
            />
          </div>
          <div className="fighter-image">
            {i === 0 && <img alt="personagem" src="./img/sanduiche.gif" />}
            {i === 1 && <img alt="personagem" src="./img/coxinha.gif" />}
          </div>
        </div>
      ))}
    </div>
  );
};

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
