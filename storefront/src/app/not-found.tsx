import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#fcfaf8] text-[#111111] px-4">
      <h1 className="text-6xl md:text-8xl font-serif italic mb-6">404</h1>
      <p className="text-xl text-[#111111]/60 mb-8 text-center max-w-md font-serif">
        This page does not exist.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#111111] text-[#fcfaf8] text-xs font-bold uppercase tracking-widest hover:bg-[#111111]/85 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
