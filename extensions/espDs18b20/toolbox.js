/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPDS18B20_CATEGORY}" id="ESPDS18B20_CATEGORY" colour="#4C97FF" secondaryColour="#3373CC" iconURI="">
    <block type="espDs18b20_read" id="espDs18b20_read">
        <field name="PIN">4</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
