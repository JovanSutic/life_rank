import { useNavigate, useParams } from 'react-router-dom';
import HealthcareBlog from '../components/Blogs/ItalyHc';
import { useMemo } from 'react';
import NomadBlog from '../components/Blogs/ItalyTaxNomad';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SerbiaBlog from '../components/Blogs/SerbiaBlog';

function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const slugs = [
    'healthcare-system-italy',
    'taxes-for-digital-nomad-visa-in-italy',
    'self-employed-taxes-in-serbia',
  ];
  const blog = useMemo(() => {
    if (slug === 'healthcare-system-italy') return <HealthcareBlog />;
    if (slug === 'taxes-for-digital-nomad-visa-in-italy') return <NomadBlog />;
    if (slug === 'self-employed-taxes-in-serbia') return <SerbiaBlog />;
  }, [slug]);
  if (!slugs.includes(slug || '')) {
    return <div className="text-center text-2xl">Blog you are looking for doesn't exist.</div>;
  }
  return (
    <div className="relative flex flex-col min-h-screen w-full lg:w-[764px] px-2 pb-6 pt-2 mx-auto">
      {blog}
      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white font-semibold text-md hover:bg-blue-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Go back
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
