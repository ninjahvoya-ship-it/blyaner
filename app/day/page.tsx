import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import DayList from "../../components/DayList";

export default function DayPage() {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#E8E6F0]">
      <div className="max-w-[1440px] mx-auto bg-main-bg rounded-[32px] shadow-xl overflow-hidden flex min-h-[93vh]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Твой день" />
          <DayList />
        </div>
      </div>
    </div>
  );
}
