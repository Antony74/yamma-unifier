import fsp from 'fs/promises';
import path from 'path';

const exampleMM = [
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
    '$( Simple example, just the rule of Modus Ponens being applied $)',
];

const th1Normal = [
    'th1 $p |- t = t $=',
    '  tt tze tpl tt weq tt tt weq tt a2 tt tze tpl tt weq tt tze tpl tt weq tt',
    '  tt weq wim tt a2 tt tze tpl tt tt a1 mp mp $.',
];

const th1Compressed = [
    'th1 $p |- t = t $=',
    `  ( tze tpl weq a2 wim a1 mp ) ABCZADZAADZAEZJJKFLIAAGHH $.`,
];

const th2Normal = [
    'th2 $p |- t = t $=',
    '  tt tze tpl tt weq tt tt weq tt a2 tt tze tpl tt weq tt tze tpl tt weq tt',
    '  tt weq wim tt a2 tt tze tpl tt tt a1 mp mp $.',
];

const th2Compressed = [
    'th2 $p |- t = t $=',
    `  ( tze tpl weq a2 wim a1 mp ) ABCZADZAADZAEZJJKFLIAAGHH $.`,
];

export const exampleFiles = {
    'bad1.mm': '$(',

    'example-compressed.mm': [
        ...exampleMM,
        ...th1Compressed,
        ...th2Compressed,
    ].join('\n'),

    'example-compressed1.mm': [
        ...exampleMM,
        ...th1Compressed,
        ...th2Normal,
    ].join('\n'),

    'example-truncated.mm': [...exampleMM, ...th1Normal, ``].join('\n'),

    'example.mm': [...exampleMM, ...th1Normal, ...th2Normal].join('\n'),

    'ununified.mmp': [
        '$theorem th1',
        '',
        '* Simple example, just the rule of Modus Ponens being applied',
        '',
        '1::            |- ( t + 0 ) = t',
        '2::            |- ( ( t + 0 ) = t -> ( ( t + 0 ) = t -> t = t ) )',
        '3::            |- ( ( t + 0 ) = t -> t = t )',
        'qed::          |- t = t',
    ].join('\n'),

    'unified.mmp': [
        '$theorem th1',
        '',
        '* Simple example, just the rule of Modus Ponens being applied',
        '',
        '1::a2                |- ( t + 0 ) = t',
        '2::a1                |- ( ( t + 0 ) = t -> ( ( t + 0 ) = t -> t = t ) )',
        '3:1,2:mp            |- ( ( t + 0 ) = t -> t = t )',
        'qed:1,3:mp         |- t = t',
        '',
        '$= ( tze tpl weq a2 wim a1 mp ) ABCZADZAADZAEZJJKFLIAAGHH $.',
        '',
        '',
    ].join('\n'),

    'bad1.mmp': ':',
};

Object.entries(exampleFiles).forEach(([filename, content]) => {
    const filePath = path.join(__dirname, '..', 'examples', filename);
    fsp.writeFile(filePath, content);
});
