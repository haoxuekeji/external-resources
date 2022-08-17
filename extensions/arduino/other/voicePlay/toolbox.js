/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_VOICE_PLAY_CATEGORY}" id="SDCARD_CATEGORY" colour="#00DD77" secondaryColour="#00AA55">
    <block type="voice_play_init" id="voice_play_init">
    </block>
    <block type="voic_play_combinationPlay" id="voic_play_combinationPlay">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT">OB.txt</field>
            </shadow>
        </value>
    </block>
    <block type="sdCard_closeFile" id="sdCard_closeFile"></block>
    <block type="sdCard_print" id="sdCard_print">
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">Hello Openblock</field>
            </shadow>
        </value>
    </block>
    <block type="sdCard_fileDataAvailable" id="sdCard_fileDataAvailable"></block>
    <block type="sdCard_readFileData" id="sdCard_readFileData"></block>
    <block type="sdCard_isFileExists" id="sdCard_isFileExists">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT">OB.txt</field>
            </shadow>
        </value>
    </block>
    <block type="sdCard_createFile" id="sdCard_createFile">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT">OB.txt</field>
            </shadow>
        </value>
    </block>
    <block type="sdCard_deleteFile" id="sdCard_deleteFile">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT">OB.txt</field>
            </shadow>
        </value>
    </block>
</category>`;
}

exports = addToolbox;
