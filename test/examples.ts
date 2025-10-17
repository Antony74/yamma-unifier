import fsp from 'fs/promises';
import path from 'path';

export const exampleFiles = {
    'example.mm': [
        '$c 0 + = -> ( ) term wff |- $.',
        '$v t r s P Q $.',
        'tt $f term t $.',
        'tr $f term r $.',
        'ts $f term s $.',
        'wp $f wff P $.',
        'wq $f wff Q $.',
        'tze $a term 0 $.',
        'tpl $a term ( t + r ) $.',
        'weq $a wff t = r $.',
        'wim $a wff ( P -> Q ) $.',
        'a1 $a |- ( t = r -> ( t = s -> r = s ) ) $.',
        'a2 $a |- ( t + 0 ) = t $.',
        '${',
        '  min $e |- P $.',
        '  maj $e |- ( P -> Q ) $.',
        '  mp $a |- Q $.',
        '$}',
        'th1 $p |- t = t $=',
        '  tt tze tpl tt weq tt tt weq tt a2 tt tze tpl tt weq tt tze tpl tt weq tt tt',
        '  weq wim tt a2 tt tze tpl tt tt a1 mp mp $.',
    ].join('\n'),

    'bad1.mm': '$(',

    'ununified.mmp': [
        'h1::test.2       |- ( P -> Q )',
        'h2::test.1       |- P',
        'qed::            |- Q',
    ].join('\n'),

    'unified.mmp': [
        '',
        '* MissingComment',
        '',
        'h1::test.2          |- ( P -> Q )',
        'h2::test.1          |- P',
        'qed:2,1:mp         |- Q',
        '',
        '$=    wp wq test.1 test.2 mp $.',
        '',
        ''
    ].join('\n'),

    'bad1.mmp': ':',
};

Object.entries(exampleFiles).forEach(([filename, content]) => {
    const filePath = path.join(__dirname, '..', 'examples', filename);
    fsp.writeFile(filePath, content);
});
