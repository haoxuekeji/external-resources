/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPDHT_CATEGORY}" id="ESPDHT_CATEGORY" colour="#4C97FF" secondaryColour="#3373CC" iconURI="">
    <block type="espDht_read" id="espDht_read">
        <field name="TYPE">11</field>
        <field name="PIN">4</field>
        <field name="DATA">temperature</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
