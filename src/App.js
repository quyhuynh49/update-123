import { useState } from "react";
import Button from "./components/Button";
import DateInput from "./components/DateInput";

function App() {
  const [list, setList] = useState([{}]);
  console.log(list)
  return (
    <div>
      <Button ripple={`#ffffff`}>Create new</Button>
      {list.length > 0 &&
        list.map((_, index) => {
          return (
            <div key={index}>
              <fieldset>
                <legend>Item {index + 1}:</legend>
                {index > 0 && (
                  <div>
                    <input
                      onChange={(event) => {
                        console.log(event.target.checked);
                        let prevItem = {};
                        const newList = list.map((tempItem, tempIndex) => {
                          if (index === tempIndex + 1) {
                            event.target.checked
                              ? (prevItem = { ...tempItem })
                              : (prevItem = {});
                          }

                          return index === tempIndex
                            ? { ...prevItem }
                            : { ...tempItem };
                        });
                        console.log(newList);
                        setList(newList);
                      }}
                      type="checkbox"
                      id={index}
                    />
                    <label htmlFor={index}>
                      inherit info from previous entry
                    </label>
                  </div>
                )}
                <div>
                  <DateInput
                    defaultValue={_.date}
                    onchange={(date) => {
                      const newList = list.map((tempItem, tempIndex) => {
                        return index === tempIndex
                          ? { ...tempItem, date: date }
                          : { ...tempItem };
                      });
                      setList(newList);
                    }} />
                </div>
                <div>
                  <label htmlFor={index}>Name</label><br />
                  <input
                    id={index}
                    value={list[index].name || ""}
                    onChange={(event) => {
                      const newList = list.map((tempItem, tempIndex) => {
                        return index === tempIndex
                          ? { ...tempItem, name: event.target.value }
                          : { ...tempItem };
                      });
                      setList(newList);
                    }}
                    type="text"
                    placeholder="enter name"
                  />
                </div>
                <div>
                  <label htmlFor={`address ${index}`}>Address</label><br />
                  <input
                    id={`address ${index}`}
                    value={list[index].address || ""}
                    onChange={(event) => {
                      const newList = list.map((tempItem, tempIndex) => {
                        return index === tempIndex
                          ? { ...tempItem, address: event.target.value }
                          : { ...tempItem };
                      });
                      setList(newList);
                    }}
                    type="text"
                    placeholder="enter address"
                  />
                </div>
                <button
                  onClick={() => {
                    const newList = list.filter((_, i) => i !== index);
                    setList(newList);
                  }}
                >
                  delete
                </button>
              </fieldset>
            </div>
          );
        })}

      <Button onClick={() => {
        setList([...list, {}]);
      }} ripple={`#ffffff`}>Create new</Button>
      {/* <button
        onClick={() => {
          setList([...list, {}]);
        }}
      >
        create new
      </button> */}
    </div>
  );
}
export default App;
