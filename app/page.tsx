'use client'

import { demos } from '@/lib/demos';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [ loadFrom, setLoadFrom ] = useState("");
  useEffect(() => {
    (async () => {
      const { S3Client } = await import("@aws-sdk/client-s3");
      setLoadFrom(JSON.stringify(new S3Client({})));
    })();
    return () => {}
  })

  return (
    <div className="space-y-6">
      <div className="text-white">Turbopack load from: {loadFrom}</div>
      <div className="space-y-8 text-white">
        {demos
          .filter((section) =>
            section.items.some((x) => typeof x.isDisabled === 'undefined'),
          )
          .map((section) => {
            return (
              <div key={section.name} className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {section.name}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {section.items
                    .filter((item) => !item.isDisabled)
                    .map((item) => {
                      return (
                        <Link
                          href={`/${item.slug}`}
                          key={item.name}
                          className="block space-y-1.5 rounded-lg border border-white/10 px-4 py-3 hover:border-white/20"
                        >
                          <div>{item.name}</div>

                          {item.description ? (
                            <div className="line-clamp-3 text-sm text-zinc-400">
                              {item.description}
                            </div>
                          ) : null}
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
