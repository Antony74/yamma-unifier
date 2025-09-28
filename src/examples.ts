import fsp from 'fs/promises';
import path from 'path';

export const exampleFiles: Record<string, string> = {
    'example.mm': [
        '$c -> ( ) wff |- $.',
        '$v P Q $.',
        'wp $f wff P $.',
        'wq $f wff Q $.',
        'wim $a wff ( P -> Q ) $.',
        '${',
        '  min $e |- P $.',
        '  maj $e |- ( P -> Q ) $.',
        '  mp $a |- Q $.',
        '$}',
    ].join('\n'),

    'bad1.mm': '(%',

    'ununified.mmp': [
        'h1::test.2       |- ( P -> Q )',
        'h2::test.1       |- P',
        'qed::            |- Q',
    ].join('\n'),

    'unified.mmp': [
        '$theorem ununified',
        '',
        '* MissingComment',
        '',
        'h1::test.2          |- ( P -> Q )',
        'h2::test.1          |- P',
        'qed:2,1:mp         |- Q',
        '',
        '$=    wp wq test.1 test.2 mp $.',
    ].join('\n'),
};

Object.keys(exampleFiles).forEach((filename) => {
    const filePath = path.join(__dirname, '..', 'examples', filename);
    fsp.writeFile(filePath, exampleFiles[filename]);
});
