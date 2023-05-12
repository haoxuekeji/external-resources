/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_VOICE_PLAY_CATEGORY}" id="VOICE_PLAY_CATEGORY" colour="#00DD77" secondaryColour="#00AA55">
    <block type="voice_play_combinationPlay" id="voice_play_combinationPlay">
    <field name="PIN">2</field>   
    <field name="NO">0</field>       
    </block>
    <block type="voice_play_playTemperature" id="voice_play_playTemperature">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="math_number">
                <field name="NUM">26.5</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playHumidity" id="voice_play_playHumidity">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="math_integer">
                <field name="NUM">50</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playIntNumber" id="voice_play_playIntNumber">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="math_integer">
                <field name="NUM">66</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playFloatNumber" id="voice_play_playFloatNumber">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="math_whole_number">
                <field name="NUM">100.25</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playSerialNumber" id="voice_play_playSerialNumber">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">13607877924</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playDistance" id="voice_play_playDistance">
    <field name="PIN">2</field>   
        <value name="DATA">
            <shadow type="math_number">
                <field name="NUM">30</field>
            </shadow>
        </value>
    </block>
    <block type="voice_play_playFullCurrentTime" id="voice_play_playFullCurrentTime">
    <field name="PIN">2</field>   
    <value name="HOUR">
        <shadow type="math_integer">
            <field name="NUM">12</field>
        </shadow>
    </value>   
    <value name="MIN">
        <shadow type="math_integer">
            <field name="NUM">30</field>
        </shadow>
    </value>   
    <value name="SEC">
        <shadow type="math_integer">
            <field name="NUM">50</field>
        </shadow>
    </value>
    </block>
    <block type="voice_play_playCurrentTime" id="voice_play_playFullCurrentTime">
    <field name="PIN">2</field>   
    <value name="HOUR">
        <shadow type="math_integer">
            <field name="NUM">12</field>
        </shadow>
    </value>   
    <value name="MIN">
        <shadow type="math_integer">
            <field name="NUM">30</field>
        </shadow>
    </value>   
    </block>

</category>`;
}

exports = addToolbox;
