module.exports = {
    env: {
        commonjs: true,
        node: true,
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {},
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'import'],
    ignorePatterns: ['node_modules/'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // 255 regras disponíveis em 08/04/2019
        // Possíveis Erros
        'for-direction': 'error', // Evita loops infinitos com for
        'getter-return': 'error', // Força getters a retornarem um valor
        'no-async-promise-executor': 'warn', // Desabilita o uso de funções async dentro de Promises
        'no-await-in-loop': 'off', // Desabilita o uso de await dentro de loops
        'no-compare-neg-zero': 'error', // Desabilita a comparação com "-0"
        'no-cond-assign': 'error', // Desabilita operadores de atribuição dentro de expressões condicionais
        'no-console': 'error', // Desabilita o uso do "console" em "console.log" e similares
        'no-constant-condition': 'warn', // Desabilita o uso de valores constantes dentro de condições. Ex: "if (true) { ... }"
        'no-control-regex': 'error', // Desabilita o uso de caracteres não imprimíveis em expressões regulares
        'no-debugger': 'warn', // Desabilita o uso de "debugger;"
        'no-dupe-args': 'error', // Desabilita o uso de argumentos repetidos em funções
        'no-dupe-keys': 'error', // Desabilita o uso de chaves repetidas em objetos
        'no-duplicate-case': 'error', // Desabilita o uso de opções repetidas em um switch-case
        'no-empty': 'warn', // Desabilita o uso de blocos vazios
        'no-empty-character-class': 'error', // Desabilita o uso de classes de caracter vazias em expressões regulares
        'no-ex-assign': 'warn', // Desabilita que o parâmetro de um catch seja reatribuído
        'no-extra-boolean-cast': 'warn', // Desabilita o uso de conversões desnecessárias para boolean
        'no-extra-parens': ['warn', 'functions'], // Desabilita parênteses desnecessários apenas em funções
        'no-extra-semi': 'warn', // Desabilita o uso de ';' desnecessário
        'no-func-assign': 'error', // Desabilita a reatribuição de function declarations
        'no-inner-declarations': 'warn', // Desabilita a declaração de funções dentro de outras funções
        'no-invalid-regexp': 'error', // Desabilita o uso de expressões regulares inválidas
        'no-irregular-whitespace': 'error', // Desabilita o uso do caracter espaço em situações inválidas
        'no-misleading-character-class': 'error', // Desabilita o uso de caracteres que são feitos de múltiplos pontos de código em expressões regulares
        'no-obj-calls': 'error', // Desabilita o uso de objetos globais, como Math, JSON e Reflect como funções
        'no-prototype-builtins': 'warn', // Desabilita o uso de funções de Object.prototype diretamente a partir do objeto
        'no-regex-spaces': 'warn', // Desabilita o uso de múltiplos espaços em expressões regulares
        'no-sparse-arrays': 'warn', // Desabilita o uso de arrays esparsos ("[,,]", por exemplo)
        'no-template-curly-in-string': 'error', // Desabilita o uso errado de ${variavel} dentro de uma string literal
        'no-unexpected-multiline': 'warn', // Desabilita o uso de expressões confusas em múltiplas linhas
        'no-unreachable': 'error', // Desabilita o uso de código não alcançável
        'no-unsafe-finally': 'off', // Desabilita o uso de expressões de controle de fluxo em blocos finally
        'no-unsafe-negation': 'error', // Desabilita o uso do operador negação de formas não seguras
        'require-atomic-updates': 'off', // Desabilitado devido a muitos falso positivos https://github.com/eslint/eslint/issues/11899
        'use-isnan': 'warn', // Força o uso de isNaN() ao invés de comparar com "=== NaN"
        'valid-typeof': 'error', // Desabilita o uso de typeof com valores que não são usuais

        // Boas Práticas
        'accessor-pairs': 'warn', // Força o uso de getters e setters sempre juntos
        'array-callback-return': 'error', // Desabilita o uso de funções de array (map, filter, etc) que não tenham retorno
        'block-scoped-var': 'error', // Desabilita que variáveis criadas com var sejam usadas fora do bloco onde foram definidas
        'class-methods-use-this': 'off', // Força que métodos de classes usem "this"
        'complexity': ['warn', 10], // Desabilita uma complexidade ciclomática (retornos possíveis em uma função) maior do que 100 -- DIMINUIR QUANDO REFATORAR
        'consistent-return': 'warn', // Força que uma função ou retorne valores em todos os "returns" ou que tenha apenas "return;"
        'curly': 'warn', // Força o uso de chaves em blocos (por exemplo, em for's e if's de uma única linha)
        'default-case': 'off', // Força o uso de default em switchs
        'dot-location': ['warn', 'property'], // Força que o ponto entre "objeto.propriedade" fique na linha da propriedade, se a linha for quebrada
        'dot-notation': 'warn', // Força o uso de "foo.bar" ao invés de "foo['bar']"
        'eqeqeq': 'error', // Força o uso de === e !== ao invés de == e !=
        'guard-for-in': 'warn', // Força o uso de if dentro de todos os for-in
        'max-classes-per-file': ['error', 1], // Força que não haja mais de 1 classe por arquivo
        'no-alert': 'error', // Desabilita o uso de "alert", "confirm" e "prompt"
        'no-caller': 'error', // Desabilita o uso de "arguments.caller" e "arguments.callee", que impossibilita otimizações
        'no-case-declarations': 'warn', // Desabilita o uso de declarações léxicas em cláusulas case/default
        'no-div-regex': 'error', // Desabilita operadores de divisão no início de expressões regulares
        'no-else-return': 'warn', // Desabilita a existência "else's" desnecessários
        'no-empty-function': 'off', // Desabilita a existência de funções vazias
        'no-empty-pattern': 'warn', // Desabilita o uso de padrões de desestruturação vazios
        'no-eq-null': 'error', // Desabilita a comparação com null utilizando == ou !=
        'no-eval': 'off', // Desabilita o uso de "eval". Desativada porque atualmente ele é usado
        'no-extend-native': 'off', // Desabilita a extensão de objetos nativos
        'no-extra-bind': 'error', // Desabilita o uso de "bind()" desnecessário
        'no-extra-label': 'error', // Desabilita o uso de labels desnecessárias
        'no-fallthrough': 'error', // Desabilita o uso de cases sem break em switchs
        'no-floating-decimal': 'warn', // Desabilita o uso de números decimais no formato ".5", "2." ou "-.7", por exemplo
        'no-global-assign': 'error', // Desabilita a atribuição em objetos globais nativos
        'no-implicit-coercion': [
            'warn',
            {
                allow: ['!!'],
            },
        ], // Desabilita coerções de tipo implícitas, exceto "!!" para booleanos
        'no-implicit-globals': 'off', // Desabilita a existência de funções globais. Desativada porque atualmente há muitas funções globais
        'no-implied-eval': 'off', // Desabilita o uso de funções similares ao eval. Desativada porque usamos eval
        'no-invalid-this': 'error', // Desabilita o uso de "this" fora de classes
        'no-iterator': 'error', // Desabilita o uso da propriedade "__iterator__"
        'no-labels': 'error', // Desabilita o uso de break/continue com labels
        'no-lone-blocks': 'error', // Desabilita o uso de blocos desnecessários
        'no-loop-func': 'error', // Desabilita a declaração de funções e expressões dentro de loops
        'no-magic-numbers': [
            'warn',
            {
                ignore: [0, 1, -1],
            },
        ], // Desabilita o uso de números mágicos (números que aparecem soltos em expressões aritméticas, ao invés de serem uma variável/constante)
        'no-multi-spaces': 'warn', // Desabilita o uso de espaços múltiplos
        'no-multi-str': 'error', // Desabilita o uso de "\" para criar strings de múltiplas linhas
        'no-new': 'error', // Desabilita o uso do operador new se não for em uma atribuição
        'no-new-func': 'error', // Desabilita o uso de "new Function(<código>)", similar ao eval
        'no-new-wrappers': 'error', // Desabilita o uso de "new Boolean()", "new String()" e "new Number()"
        'no-octal': 'error', // Desabilita o uso de octais literais
        'no-octal-escape': 'error', // Desabilita o uso de escape de octal em strings, como por exemplo "texto \251"
        'no-param-reassign': 'warn', // Desabilita a reatribuição de parâmetros, tratando-os como constantes
        'no-proto': 'error', // Desabilita o uso da propriedade "__proto__"
        'no-redeclare': 'error', // Desabilita a redeclaração de variáveis
        'no-restricted-properties': 'off', // Desabilita certas propriedades em objetos
        'no-return-assign': 'error', // Desabilita atribuição em um return
        'no-return-await': 'warn', // Desabilita o uso desnecessário de "return await" em funções assíncronas
        'no-script-url': 'error', // Desabilita o uso de URLs "javascript:"
        'no-self-assign': 'error', // Desabilita atribuições do tipo "x = x" ou "1 = 1"
        'no-self-compare': 'error', // Desabilita comparações do tipo "x === x" ou "1 == 1"
        'no-sequences': 'error', // Desabilita o uso da "," para separar comandos
        'no-throw-literal': 'error', // Desabilita o lançamento de strings em exceções, pois devem ser envolvidas por Error("texto")
        'no-unmodified-loop-condition': 'error', // Desabilita a modificação de variáveis de controle de loop fora do loop
        'no-unused-expressions': 'error', // Desabilita a existência de expressões não utilizadas
        'no-unused-labels': 'error', // Desabilita o uso de labels não utilizadas
        'no-useless-call': 'error', // Desabilita o uso de ".call()" e ".apply()" desnecessários
        'no-useless-catch': 'error', // Desabilita o uso de "catch's" desnecessários
        'no-useless-concat': 'warn', // Desabilita a concatenação desnecessária de strings
        'no-useless-escape': 'warn', // Desabilita o escape desnecessário de caracteres
        'no-useless-return': 'warn', // Desabilita o uso de "returns" desnecessários
        'no-void': 'error', // Desabilita o uso do operador "void"
        'no-warning-comments': 'off', // Desabilita o uso de comentários de aviso, como , FIXME, etc
        'no-with': 'error', // Desabilita o uso do operador "with"
        'prefer-named-capture-group': 'error', // Recomenda o uso de "named capture groups" em expressões regulares
        'prefer-promise-reject-errors': 'error', // Recomenda o uso de "reject(new Error())" em promises
        'radix': 'off', // Requer o uso do parâmetro "radix" na função parseInt()
        'require-await': 'off', // Desabilita o uso de funções async que não usem await
        'require-unicode-regexp': 'off', // Força o uso da flag u nas expressões regulares
        'vars-on-top': 'off', // Força a declaração de variáveis no topo de seu escopo
        'wrap-iife': 'warn', // Requer que IIFEs se encontrem entre parênteses
        'yoda': 'warn', // Evita o uso de expressões que o Yoda de Star Wars falaria, como "red" === color, ao invés de color === "red"

        // Strict Mode
        'strict': 'off', // Força ou desabilita o strict mode

        // Variáveis
        'init-declarations': 'warn', // Requer que variáveis sejam inicializadas na sua declaração
        'no-delete-var': 'off', // Desabilita a possibilidade de excluir variáveis
        'no-label-var': 'error', // Desabilita labels com nomes de variáveis
        'no-restricted-globals': 'off', // Desabilita o uso das variáveis globais definidas
        'no-shadow': 'error', // Desabilita a declaração de variáveis que sobrepoem outras de blocos mais externos, por terem o mesmo nome
        'no-shadow-restricted-names': 'error', // Desabilita a atribuição de valores a valores padrão, como undefined, NaN, etc
        'no-undef': 'off', // Desabilita o uso de variáveis que ainda não foram definidas -- ATIVAR quando usar import Node
        'no-undef-init': 'warn', // Desabilita a inicialização de variáveis com "undefined"
        'no-undefined': 'off', // Desabilita o uso do valor undefined de forma inadequada
        'no-unused-vars': 'off', // Força que todas as variáveis sejam usadas -- ATIVAR quando usar imports do node, desabilitar na main
        'no-use-before-define': 'off', // Desabilita o uso de uma variável antes de sua declaração -- ATIVAR quando refatorar

        // Node.js e CommonJS
        'callback-return': 'error', // Força que cada chamada de callback seja do tipo "return callback();"
        'handle-callback-err': 'off', // Força o tratamento de erros em callbacks
        'no-buffer-constructor': 'error', // Desabilita o uso do construtor Buffer()
        'no-mixed-requires': 'error', // Desabilita a atribuição de variáveis comuns entre requires
        'no-new-require': 'error', // Desabilita o uso de "var x = new require('modulo');"
        'no-path-concat': 'error', // Desabilita a concatenação de strings com "__dirname" e "__filename"
        'no-process-env': 'error', // Desabilita o uso de "process.env"
        'no-process-exit': 'error', // Desabilita o uso de "process.exit()"
        'no-restricted-modules': 'off', // Desabilita o uso de certos modules do Node.js
        'no-sync': 'error', // Desabilita o uso de funções síncronas

        // Questões de Estilo
        'array-bracket-newline': ['warn', 'consistent'], // Força quebras de linha após abrir e antes de fechar chaves de colchetes de forma consistente
        'array-bracket-spacing': 'warn', // Desabilita espaços dentro de colchetes
        'array-element-newline': ['warn', 'consistent'], // Força quebras de linha entre elementos de arrays de forma consistente
        'block-spacing': 'warn', // Força o uso de espaços dentro de blocos de uma só linha (" function x() { console.log('teste'); }")
        'brace-style': [
            'warn',
            '1tbs',
            {
                allowSingleLine: true,
            },
        ], // Força o uso do estilo de abertura e fechamento de chaves em blocos
        'camelcase': 'warn', // Força o uso de camel case em nomes de variáveis e propriedades de objetos
        'capitalized-comments': [
            'warn',
            'always',
            {
                ignorePattern: 'const|let|var|function|\\w+ *\\(|\\w.\\w',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true,
            },
        ], // Força que a primeira letra de um comentário seja maiúscula
        'comma-dangle': ['warn', 'always-multiline'], // Força o uso de vírgulas no final de um objeto ou array
        'comma-spacing': 'warn', // Desabilita o uso de espaço antes de vírgula e força o uso após uma vírgula
        'comma-style': 'warn', // Força o uso de vírgula no final da linha, ao invés de no início da próxima linha
        'computed-property-spacing': 'warn', // Desabilita o uso de espaço em "obj[ 'prop' ]", forçando "obj['prop']"
        'consistent-this': 'warn', // Força o uso de uma varíavel de captura do this consistente, como "that"
        'eol-last': 'warn', // Força o uso de uma linha em branco no final de cada arquivo
        'func-call-spacing': 'warn', // Desabilita o uso do espaço ao chamar funções, como "fazAlgo ('oi');", forçando "fazAlgo('oi')
        'func-name-matching': 'off', // Força que variáveis/propriedades tenham o mesmo nome de funções/propriedades/variáveis que recebe.
        'func-names': ['warn', 'always'], // Desabilita o uso de nomes para funções que podem ser anônimas
        'func-style': [
            'warn',
            'declaration',
            {
                allowArrowFunctions: true,
            },
        ], // Desabilita o uso de function expressions, exceto de arrow functions
        'function-paren-newline': ['warn', 'never'], // Força o uso consistente de quebras de linha dentro de parênteses de uma função
        'id-blacklist': 'off', // Nomes que não podem ser usados
        'id-length': 'off', // Força que nomes tenham um tamanho mínimo e/ou máximo
        'id-match': 'off', // Força que nomes sigam o padrão da expressão regular definida
        'implicit-arrow-linebreak': 'warn', // Força que arrow functions sem bloco sejam definidas em uma única linha
        'indent': ['warn', 4], // Força o uso de identação com 4 espaços
        'jsx-quotes': 'off', // Força o uso de aspas simples ou duplas em atributos JSX
        'key-spacing': 'warn', // Força o uso consistente de espaçamento entre chave e valor de objetos
        'keyword-spacing': 'warn', // Força o uso de espaço antes e depois de palavras reservadas. Ex. "if (x)"
        'line-comment-position': 'off', // Força o posicionamento de comentários de uma única linha: acima ou à direita
        'linebreak-style': ['error', 'windows'], // Força o uso de um caracter de quebra de linha consistente. Windows = \r\n
        'lines-around-comment': 'warn', // Força o uso de linhas vazias antes e depois de comentários
        'lines-between-class-members': 'warn', // Força o uso de linhas vazia entre membros de uma classe
        'max-depth': ['warn', 4], // Define a profundidade máxima de identação
        'max-len': [
            'warn',
            {
                code: 120,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ], // Define o tamanho máximo de uma linha
        'max-lines': ['warn', 500], // Define a quantidade máxima de linhas de um arquivo
        'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }], // Define a quantidade máxima de linhas em uma função
        'max-nested-callbacks': [
            'warn',
            {
                max: 3,
            },
        ], // Define a quantidade máxima de callbacks aninhados
        'max-params': [
            'warn',
            {
                max: 3,
            },
        ], // Define a quantidade máxima de parâmetros de uma função
        'max-statements': [
            'warn',
            {
                max: 15,
            },
        ], // Define a quantidade máxima de comandos em uma função
        'max-statements-per-line': [
            'warn',
            {
                max: 2,
            },
        ], // Define a quantidade máxima de comandos por linha
        'multiline-comment-style': 'off', // Define o formato padrão de comentários de múltiplas linhas
        'multiline-ternary': 'off', // Força ou desabilita o uso de quebras de linha em operadores ternários
        'new-cap': 'error', // Força o uso de letras maiúsculas no início dos nomes de construtores
        'new-parens': 'warn', // Força o uso de parênteses ao invocar construtores através da palavra new
        'newline-per-chained-call': [
            'warn',
            {
                ignoreChainWithDepth: 4,
            },
        ], // Força uma quebra de linha entre cada chamada encadeada de uma função
        'no-array-constructor': 'warn', // Desabilita o uso do construtor Array, exceto para criar arrays esparsos
        'no-bitwise': 'warn', // Desabilita o uso de bitwise operators
        'no-continue': 'warn', // Desabilita o uso de "continue;" em loops
        'no-inline-comments': 'off', // Desabilita o uso de comentários na mesma linha de comandos
        'no-lonely-if': 'warn', // Desabilita o uso de ifs dentro de elses quando deveria ser usado "else if"
        'no-mixed-operators': 'error', // Desabilita o uso dos operadores || e && na mesma expressão sem parentização
        'no-mixed-spaces-and-tabs': 'warn', // Desabilita o uso de espaços e tabs para identação, exigindo consistência
        'no-multi-assign': 'off', // Desabilita o uso de atribuições múltiplas encadeadas. Ex: "let a = b = 1;"
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 2,
                maxEOF: 1,
                maxBOF: 1,
            },
        ], // Desabilita o uso de múltiplas linhas em branco seguidas
        'no-negated-condition': 'warn', // Desabilita o uso de condições negativas quando a positiva pode ser usada
        'no-nested-ternary': 'error', // Desabilita o uso de expressões ternárias aninhadas
        'no-new-object': 'warn', // Desabilita o uso do construtor "Object"
        'no-plusplus': 'off', // Desabilita o uso dos operadores ++ e --
        'no-restricted-syntax': 'off', // Desabilita o uso de sintaxe restrita especificada
        'no-tabs': 'warn', // Desabilita o uso de tabs
        'no-ternary': 'off', // Desabilita o uso de operadores ternários
        'no-trailing-spaces': 'warn', // Desabilita o uso de espaços desnecessários no final de linhas
        'no-underscore-dangle': 'off', // Desabilita o uso de underscores no início e no fim de variáveis
        'no-unneeded-ternary': 'warn', // Desabilita o uso de operadores ternários desnecessários
        'no-whitespace-before-property': 'warn', // Desabilita o uso espaço em branco antes de propriedades. Ex: "obj. prop()"
        'nonblock-statement-body-position': 'warn', // Força a posição de comandos de uma única linha, como um if ou for sem bloco
        'object-curly-newline': 'warn', // Força o uso de quebras de linha consistentes dentro de blocos
        'object-curly-spacing': ['warn', 'always'], // Força o uso de espaçamentos consistentes dentro de blocos
        'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }], // Força o posicionamento de propriedades de objetos em linhas diferentes
        'one-var': 'off', // Força que as variáveis sejam declaradas juntas ou separadas em funções
        'one-var-declaration-per-line': 'warn', // Força ou desabilita quebras de linha entre declarações de variáveis
        'operator-assignment': 'warn', // Força o uso de atalhos de operações de atribuição. Ex.: "x = x + y" --> "x += y"
        'operator-linebreak': [
            'warn',
            'after',
            {
                overrides: {
                    '?': 'after',
                    '=': 'after',
                },
            },
        ], // Força o uso de estilo de quebra de linha consistente
        'padded-blocks': [
            'warn',
            {
                blocks: 'never',
                classes: 'always',
                switches: 'never',
            },
        ], // Força ou desabilita o uso de espaçamento dentro de blocos
        'padding-line-between-statements': 'warn', // Força ou desabilita o uso de espaçamento entre comandos
        'prefer-object-spread': 'warn', // Força o uso de spread operatorao invés de Object.assign()
        'quote-props': ['warn', 'consistent-as-needed'], // Força o uso de aspas ao definir propriedades de objetos
        'quotes': ['warn', 'single'], // Força o uso de aspas simples sempre que possível
        'semi': 'warn', // Força o uso de ponto-e-vírgula ao final de comandos
        'semi-spacing': 'warn', // Força o uso de espaçamento antes e depois de ponto-e-vírgula
        'semi-style': 'warn', // Força o uso de ponto-e-vírgula no final da linha
        'sort-keys': 'off', // Força que as chaves de um objeto estejam ordenadas alfabeticamente
        'sort-vars': 'off', // Força que variáveis sejam declaradas em ordem alfabéticas
        'space-before-blocks': 'warn', // Força o uso de espaços antes de blocos
        'space-before-function-paren': [
            'warn',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ], // Regula o uso de espaço após as palavras function e async
        'space-in-parens': 'warn', // Desabilita o uso de espaços dentro de parênteses
        'space-infix-ops': 'warn', // Força o uso de espaços entre operadores e operandos
        'space-unary-ops': 'warn', // Força ou desabilita o uso de espaço antes ou depois de operadores unários
        'spaced-comment': 'warn', // Força ou desabilita um espaço em branco antes de um comentário
        'switch-colon-spacing': 'warn', // Força um espaçamento entre "dois pontos" de um switch
        'template-tag-spacing': 'warn', // Força ou desabilita o uso de espaçamento entre template tags e seus literais
        'unicode-bom': 'warn', // Força ou desabilita o Unicode Byte Orer Mark (BOM)
        'wrap-regex': 'warn', // Força que literais de expressões regulares apareçam entre parênteses

        // ECMAScript 6
        'arrow-body-style': 'warn', // Desabilita o uso de chaves em arrow functions, quando possível
        'arrow-parens': 'warn', // Força o uso de parênteses quando a arrow function só tem um parâmetro
        'arrow-spacing': 'warn', // Força o uso de espaço antes e depois da arrow de uma arrow function
        'constructor-super': 'error', // Força o uso de super() em classes que herdam de outras
        'generator-star-spacing': 'warn', // Força o espaçamento entre o "*" de generator functions
        'no-class-assign': 'error', // Desabilita a modificação de variáveis da declaração de classes
        'no-confusing-arrow': 'warn', // Desabilita o uso de arrow functions de maneira que possa ser confundida com uma comparação
        'no-const-assign': 'error', // Desabilita a modificação de variáveis const
        'no-dupe-class-members': 'error', // Desabilita a duplicação de nomes em membros de uma classes
        'no-duplicate-imports': 'error', // Desabilita o uso de imports duplicados
        'no-new-symbol': 'error', // Desabilita o uso de "new Symbol("foo")"
        'no-restricted-imports': 'off', // Desabilita o uso de certos imports
        'no-this-before-super': 'error', // Desabilita o uso de this/super antes da chamada super() em construtores de classes que herdam de outras
        'no-useless-computed-key': 'warn', // Desabilita o uso de "computed property keys" desnecessários. Ex.: {['chave'] : value }
        'no-useless-constructor': 'warn', // Desabilita o uso de construtores desnecessários
        'no-useless-rename': 'warn', // Desabilita a renomeção inútil de variáveis
        'no-var': 'warn', // Impede o uso de var para definir variáveis
        'object-shorthand': 'warn', // Força o uso a "object literal shorthand syntax"
        'prefer-arrow-callback': 'warn', // Requer o uso de arrow functions para callbacks
        'prefer-const': 'warn', // Força o uso de const quando possível
        'prefer-destructuring': 'off', // Força o uso da desestruturação de arrays e objects
        'prefer-numeric-literals': 'warn', // Força o uso de numerais literais
        'prefer-rest-params': 'warn', // Força o uso de rest parameters (...) ao invés de "arguments"
        'prefer-spread': 'warn', // Força o uso do spread operator quando possível
        'prefer-template': 'warn', // Força o uso de template literals ao invés da concatenação de strings
        'require-yield': 'warn', // Desabilita o uso de generator functions que não usam yield
        'rest-spread-spacing': 'warn', // Força o uso de espaçamento entre rest e spread operators
        'sort-imports': 'warn', // Força a ordenação dos imports
        'symbol-description': 'warn', // Força o uso de uma descrição para "Symbol('descrição')"
        'template-curly-spacing': 'warn', // desabilita o uso de espaçamento em template strings
        'yield-star-spacing': 'warn', // Força o uso de espaçamento ao redor do "*" de expressões "yield*""
    },
};
