import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default async function TermsPage() {
  const t = await getTranslations('legal.termsOfUse');
  const tCommon = await getTranslations('common');

  const text = t('text');
  const paragraphs = text.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/80 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {tCommon('nav.home')}
        </Link>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
          {tCommon('footerTerms')}
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-sm text-gray-700 dark:text-gray-300">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
