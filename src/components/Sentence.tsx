import * as React from 'react';

export function Sentence({ sentence }: { sentence: string }) {
    return (
        <div className="cn-sentence">
            {sentence}
        </div>
    );
}