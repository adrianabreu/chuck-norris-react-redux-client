import * as React from 'react';

export function SentenceDumb({ sentence }: { sentence: string }) {
    return (
        <div className="cn-sentence">
            {sentence}
        </div>
    );
}