/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPSDCARD_CATEGORY}" id="ESPSDCARD_CATEGORY" colour="#5CB1D6" secondaryColour="#2E8EB8" iconURI="">
    <block type="espSdCard_mount" id="espSdCard_mount">
        <field name="SCK">18</field>
        <field name="MOSI">23</field>
        <field name="MISO">19</field>
        <field name="CS">5</field>
    </block>
    <block type="espSdCard_appendLine" id="espSdCard_appendLine">
        <value name="FILE">
            <shadow type="text">
                <field name="TEXT">data.txt</field>
            </shadow>
        </value>
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="espSdCard_readFile" id="espSdCard_readFile">
        <value name="FILE">
            <shadow type="text">
                <field name="TEXT">data.txt</field>
            </shadow>
        </value>
    </block>
    <block type="espSdCard_deleteFile" id="espSdCard_deleteFile">
        <value name="FILE">
            <shadow type="text">
                <field name="TEXT">data.txt</field>
            </shadow>
        </value>
    </block>
</category>    `;
}
exports = registerToolboxs;
