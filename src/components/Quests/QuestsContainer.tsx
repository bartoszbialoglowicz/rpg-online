import { useContext, useEffect, useState } from "react";
import type { Quest, UserQuest } from "../../types/QuestsTypes";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import QuestItem from "./QuestItem";
import QuestListContainer from "./QuestListContainer";

import './QuestsContainer.css';

const QuestsContainer = () => {
  const [quests, setQuests] = useState<UserQuest[]>([]);
  const [activeQuests, setActiveQuests] = useState<UserQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserQuest[]>([]);

  const userCtx = useContext(UserContext);

  const sendRequest = useHttp<UserQuest[]>(
    'api/quests/',
    'GET',
    undefined,
    userCtx.user?.authToken
  );

  const setQuestsJSX = (quests: UserQuest[]) => {
    quests.forEach((quest: UserQuest) => {
      if (quest.progress === 'completed') {
        setCompletedQuests(prevState => [...prevState, quest]);
      } else {
        setActiveQuests(prev => [...prev, quest]);
      }
    });
  };  

  useEffect(() => {
    const getQuests = async () => {
      const { data, code } = await sendRequest();
      if (code === 200) {
        setQuestsJSX(data);
      }
    }
    getQuests();
  }, []);

  return <div className="quests-container">
    <QuestListContainer quests={activeQuests} title="Aktywne" />
    <QuestListContainer quests={completedQuests} title="Zakończone" />
  </div>
}

export default QuestsContainer;