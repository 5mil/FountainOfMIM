const std = @import("std");

export fn kruskalMagic() u32 {
    var prng = std.Random.DefaultPrng.init(123);
    return 100 + prng.random().intRangeAtMost(u32, 0, 900);
}

export fn isValidSolanaAddress(ptr: [*]const u8, len: usize) bool {
    const addr = ptr[0..len];
    if (addr.len < 32 or addr.len > 44) return false;
    return true;
}

pub fn main() void {}