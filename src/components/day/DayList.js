import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import Day from "./Day";

const DayList = ({
  idStep,
  poisForDay,
  removePoiOfDay,
  idTrip,
  openModal,
  addPoiToDay,
  AddingPoiToDayId,
  setAddingPoiToDayId,
}) => {
  const { isLoading, data: days } = useQuery(idStep + "days", () =>
    listAPI.GetDaysfromStep({ idStep: idStep, tripId: idTrip })
  );

  if (isLoading) return "Loading ...";
  else
    return (
      <div style={{ width: "100%" }}>
        {days.map((day) => {
          return (
            <Day
              removePoiOfDay={removePoiOfDay}
              poisForDay={poisForDay}
              key={day.id}
              id={day.id}
              number={day.number}
              idStep={idStep}
              idTrip={idTrip}
              POIs={day.poiList}
              openModal={openModal}
              addPoiToDay={addPoiToDay}
              AddingPoiToDayId={AddingPoiToDayId}
              setAddingPoiToDayId={setAddingPoiToDayId}
            />
          );
        })}
      </div>
    );
};

export default DayList;
