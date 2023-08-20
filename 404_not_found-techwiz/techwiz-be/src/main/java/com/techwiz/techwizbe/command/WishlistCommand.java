package com.techwiz.techwizbe.command;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishlistCommand {
    private long id;
    private long userId;
    private List<WishlistItemCommand> wishlistItems;
}
