import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";
import LifeCycle from "./LifeCycle";
import OptimizeTest from "./OptimizeTest";
import OptimizeTestTwo from "./OptimizeTestTwo";

/*
const dummyList = [
  {
    id: 1,
    author: "안수이",
    content: "하이 하이 하이1",
    emotion: 5,
    created_Date: new Date().getTime(),
  },
  {
    id: 2,
    author: "김수이",
    content: "하이 하이 하이2",
    emotion: 4,
    created_Date: new Date().getTime(),
  },
  {
    id: 3,
    author: "박수이",
    content: "하이 하이 하이3",
    emotion: 4,
    created_Date: new Date().getTime(),
  },
  {
    id: 4,
    author: "최수이",
    content: "하이 하이 하이4",
    emotion: 3,
    created_Date: new Date().getTime(),
  },
];
*/

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 0~4까지 랜덤으로 생성 후 정수로 바꾸고 + 1 -> 1~5
        created_Date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_Date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_Date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // 데이터의 길이가 변할 때만 연산 수행 -> 연산 최적화!

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 함수가 아니라 값으로 사용

  return (
    <div className="App">
      <LifeCycle />
      <OptimizeTest />
      <OptimizeTestTwo />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount} </div>
      <div>기분 나쁜 일기 개수: {badCount} </div>
      <div>기분 좋은 일기 비율: {goodRatio}% </div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
