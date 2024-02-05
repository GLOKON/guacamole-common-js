/**
 * Simple Guacamole protocol parser that invokes an oninstruction event when
 * full instructions are available from data received via receive().
 */
export class Parser {
    /**
     * Appends the given instruction data packet to the internal buffer of
     * this Guacamole.Parser, executing all completed instructions at
     * the beginning of this buffer, if any.
     * @param packet The instruction data to receive.
     * @param [isBuffer=false]
     *     Whether the provided data should be treated as an instruction buffer
     *     that grows continuously. If true, the data provided to receive()
     *     MUST always start with the data provided to the previous call. If
     *     false (the default), only the new data should be provided to
     *     receive(), and previously-received data will automatically be
     *     buffered by the parser as needed.
     */
    receive(packet: string, isBuffer?: boolean): void;

    /**
     * Fired once for every complete Guacamole instruction received, in order.
     * @event
     * @param opcode The Guacamole instruction opcode.
     * @param parameters The parameters provided for the instruction, if any.
     */
    oninstruction: null | ((opcode: string, params: string[]) => void);

    /**
     * Returns the number of Unicode codepoints (not code units) within the given
     * string. If character offsets are provided, only codepoints between those
     * offsets are counted. Unlike the length property of a string, this function
     * counts proper surrogate pairs as a single codepoint. High and low surrogate
     * characters that are not part of a proper surrogate pair are counted
     * separately as individual codepoints.
     *
     * @param str
     *     The string whose contents should be inspected.
     *
     * @param [start=0]
     *     The index of the location in the given string where codepoint counting
     *     should start. If omitted, counting will begin at the start of the
     *     string.
     *
     * @param [end]
     *     The index of the first location in the given string after where counting
     *     should stop (the character after the last character being counted). If
     *     omitted, all characters after the start location will be counted.
     *
     * @returns
     *     The number of Unicode codepoints within the requested portion of the
     *     given string.
     */
    static codePointCount(str: string, start: number, end: number): number;

    /**
     * Converts each of the values within the given array to strings, formatting
     * those strings as length-prefixed elements of a complete Guacamole
     * instruction.
     *
     * @param elements
     *     The values that should be encoded as the elements of a Guacamole
     *     instruction. Order of these elements is preserved. This array MUST have
     *     at least one element.
     *
     * @returns
     *     A complete Guacamole instruction consisting of each of the provided
     *     element values, in order.
     */
    static toInstruction(elements: any[]): string;
}
