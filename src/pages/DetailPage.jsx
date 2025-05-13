import DoubleSliderRange from "../components/elements/DoubleSliderRange/DoubleSliderRange";

export default function DetailPage() {
  return (
    <>
      <div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
        <DoubleSliderRange minValue={0} maxValue={100} />
      </div>
    </>
  );
}
