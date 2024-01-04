import { useEffect, useState } from "react";
// [] Dependamcy Array(의존성 배열) : 이 배열 내에 들어있는 값이 변화하면 콜백함수가 수행된다.

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount");
    return () => {
      //unmount 시점에 실행
      console.log("Unmount(죽음): 화면에서 사라지는 것");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  // 컴포넌트가 마운트 된 시점에만 작동
  useEffect(() => {
    console.log("Mount(탄생): 화면에 나타나는 것");
  }, []);

  // 컴포넌트가 업데이트 된 시점에 작동: 부모가 업데이트(리렌더링)되는 순간
  useEffect(() => {
    console.log("update(변화): 업데이트(리렌더)");
  });

  // count가 변화하는 순간에 작동
  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다. count를 1로 초기화 합니다.");
      setCount(1);
    }
  }, [count]);

  // text가 변화하는 순간에 작동
  useEffect(() => {
    console.log(`text is update: ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
      </div>
    </div>
  );
};

export default LifeCycle;
