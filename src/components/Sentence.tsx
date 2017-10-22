import * as React from 'react';
import { Sentence } from '../store/Sentence';
export function SentenceDumb({ sentence }: { sentence: Sentence }) {
    return (
        <div className="cn-sentence" dangerouslySetInnerHTML={{ __html: sentence.value }} />
    );
}