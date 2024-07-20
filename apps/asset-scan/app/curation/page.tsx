import { CurationList } from './_components/CurationList';

export default function Page() {
  return (
    <div className="bg-base-100 w-full max-w-[960px] mx-auto">
      <div className="text-2xl font-bold mt-[60px] mb-[40px]">
        All
        <span className="bg-[#00AAA1] text-white ml-1">Curations</span>
      </div>
      <CurationList />
    </div>
  );
}
